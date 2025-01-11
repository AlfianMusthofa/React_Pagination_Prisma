import { useState, useEffect, useCallback } from "react"
import axios from 'axios';
import ReactPaginate from 'react-paginate'

const UserList = () => {

   const [users, setUsers] = useState([])
   const [page, setPage] = useState(0)
   const [limit, setLimit] = useState(10)
   const [pages, setPages] = useState(0)
   const [rows, setRows] = useState(0)
   const [keyword, setKeyword] = useState("")
   const [query, setQuery] = useState("")

   const getUsers = useCallback(async () => {
      const response = await axios.get(`http://localhost:3000/users?search_query=${keyword}&page=${page}&limit=${limit}`);

      setUsers(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
   }, [keyword, page, limit]);

   useEffect(() => {
      getUsers();
   }, [getUsers])

   const changePage = ({ selected }) => {
      setPage(selected);
   }

   const searchData = (e) => {
      e.preventDefault();
      setPage(0);
      setKeyword(query);
   }

   return (
      <>
         <div className="container mt-5">
            <div className="columns">
               <div className="column is-centered">
                  <form onSubmit={searchData}>
                     <div className="field has-addons">
                        <div className="control is-expanded">
                           <input type="text" className="input" value={query} onChange={(e) => setQuery(e.target.value)} />
                        </div>
                        <div className="control">
                           <button type="submit" className="button is-info">Search</button>
                        </div>
                     </div>
                  </form>
                  <table className="table is-striped is-bordered is-fullwidth mt-2 ">
                     <thead>
                        <tr>
                           <th>Id</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Gender</th>
                        </tr>
                     </thead>
                     <tbody>
                        {users.map((user) => (
                           <tr key={user.id}>
                              <th>{user.id}</th>
                              <th>{user.name}</th>
                              <th>{user.email}</th>
                              <th>{user.gender}</th>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <p>Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}</p>
                  <nav className="pagination is-centered" role="navigation" aria-label="pagination" key={rows}>
                     <ReactPaginate
                        previousLabel={"< Prev"}
                        nextLabel={"Next >"}
                        pageCount={Math.min(10, pages)}
                        onPageChange={changePage}
                        containerClassName={"pagination-list"}
                        pageLinkClassName={"pagination-link"}
                        previousLinkClassName={"pagination-previous"}
                        nextLinkClassName={"pagination-next"}
                        activeLinkClassName={"pagination-link is-current"}
                        disabledLinkClassName={"pagination-link is-disabled"}
                     />
                  </nav>
               </div>
            </div>
         </div>
      </>
   )
}

export default UserList