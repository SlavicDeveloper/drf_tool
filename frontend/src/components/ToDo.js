import React from 'react'
import {Link} from 'react-router-dom'


const ToDoItem = ({item, delete_todo}) => {
   return (
       <tr>
           <td>
               {item.id}
           </td>
           <td>
               {item.project_name}
           </td>
           <td>
               {item.text}
           </td>
           <td>
               {item.creation_date}
           </td>
           <td>
               {item.update_date}
           </td>
           <td>
               {item.users_checklist_author}
           </td>

           <td>
               <button onClick={() => delete_todo(item.id)} type="button">Delete</button>
           </td>
       </tr>
   )
}


const ToDoItemList = ({items, delete_todo}) => {
   return (
    <div>
       <table>
                   <th>
                       TODO id
                   </th>
                   <th>
                       Project name
                   </th>
                   <th>
                       Text
                   </th>
                   <th>
                       Creation date
                   </th>
                   <th>
                       Update date
                   </th>
                   <th>
                       Authors
                   </th>
                   {items.map((item) => <ToDoItem item={item}  delete_todo={delete_todo}/>)}
       </table>
       <Link to= '/new_todo/create'>Create</Link>
    </div>
   )
}


export default ToDoItemList