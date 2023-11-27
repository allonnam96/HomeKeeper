import { useSelector } from 'react-redux';

function Profile () {
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <h2>{currentUser.username}</h2>
    </>
  );

}

export default Profile;