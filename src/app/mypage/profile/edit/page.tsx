import { getUserDashboard } from '@/services/users';
import EditForm from './components/EditForm';

export type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

interface Props {
  searchParams: { type: EditType };
}

const Edit = async ({ searchParams }: Props) => {
  const userDashboard = await getUserDashboard();
  return <EditForm type={searchParams.type} userDashboard={userDashboard} />;
};

export default Edit;
