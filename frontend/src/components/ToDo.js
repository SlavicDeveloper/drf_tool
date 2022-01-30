import React from 'react'


const ToDoItem = ({item}) => {
   return (
       <tr>
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
               {item.status}
           </td>
       </tr>
   )
}


const ToDoItemList = ({items}) => {
   return (
       <table>
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
                   <th>
                       Status
                   </th>
                   {items.map((item) => <ToDoItem item={item} />)}
       </table>
   )
}


export default ToDoItemList