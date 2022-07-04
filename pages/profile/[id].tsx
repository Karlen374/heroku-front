import UserProfile from 'src/components/userProfile/userProfile';
import MainLayout from 'src/layouts/MainLayout';
import { IUser } from 'src/types/IUser';

export async function getServerSideProps({ params }) {
  const res = await fetch(`  https://backend-car.herokuapp.com/auth/users/${params.id}`);
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
