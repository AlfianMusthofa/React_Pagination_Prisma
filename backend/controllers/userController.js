const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getUsers = async (req, res) => {

   const page = parseInt(req.query.page) || 0;
   const limit = parseInt(req.query.limit) || 10;
   const search = req.query.search_query || "";
   const offset = limit * page;


   const totalRows = await prisma.users.count({
      where: {
         OR: [
            {
               name: {
                  contains: search,
               }
            },
            {
               email: {
                  contains: search
               }
            }
         ]
      }
   });

   const totalPage = Math.ceil(totalRows / limit);

   const result = await prisma.users.findMany({
      where: {
         OR: [
            {
               name: {
                  contains: search,
               }
            },
            {
               email: {
                  contains: search
               }
            }
         ]
      },
      skip: offset,
      take: limit,
      orderBy: {
         id: 'desc'
      }
   })

   res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage
   })

}

module.exports = { getUsers }