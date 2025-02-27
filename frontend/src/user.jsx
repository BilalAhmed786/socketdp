import { useEffect, useState } from "react";
import axios from 'axios'

const Form = ({socket}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [users, setUsers] = useState([]); // Stores user data
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email address";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // setUsers([...users, formData]); // Add new user to the table
        setFormData({ username: "", email: "", phone: "" }); // Clear form fields
        setErrors({}); // Clear errors


        
    try{
        const result = await axios.post('/api/user',{formData})

        if(result.data){
           
            //socket wroking 

            socket?.emit('userid',result.data)

            setFormData({ username: "", email: "", phone: "" }); // Clear form fields
            setErrors({}); 


        }

    }catch(error){
        console.log(error)
    }
    
    

  };

      
      }
    
    
    
  // Delete a user from the table
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };


  useEffect(()=>{


    const handleAlluser = (data)=>{

         setUsers(data); // Add new user to the table

    }


    const handleSingleuser = (data)=>{

        setUsers((prev)=>{
           
           return [...prev,data]

        });

    }

    socket?.on('alluser',handleAlluser)
    socket?.on('singleuser',handleSingleuser)
return ()=>{

    socket?.off('alluser',handleAlluser)
    socket?.off('singleuser',handleSingleuser)

}

  },[socket])



  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">User Form</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {/* User Table */}
      {users.length > 0 && (
        <div className="mt-8 w-full max-w-3xl">
          <h2 className="text-xl font-bold mb-4 text-center">User List</h2>
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">{user.name}</td>
                  <td className="py-2 px-4 text-center">{user.email}</td>
                  <td className="py-2 px-4 text-center">{user.phone}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;
