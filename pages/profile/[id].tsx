import UserProfile from 'src/components/userProfile/userProfile';
import MainLayout from 'src/layouts/MainLayout';
import { IUser } from 'src/types/IUser';

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}auth/users/${params.id}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}

interface IUSerProfilePage {
  user:IUser;
}

const UserProfilePage = ({ user }:IUSerProfilePage) => {
  return (
    <MainLayout>
      <UserProfile user={user} />
    </MainLayout>
  );
};
export default UserProfilePage;
