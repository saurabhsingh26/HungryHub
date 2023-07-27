import React, {useContext} from 'react'
import UserContext from '../utils/UserContext'
const About = () => {
  const data = useContext(UserContext);
  console.log(data);
  return (
    <div>
      {data.loggedInUser}
    </div>
  )
}

export default About