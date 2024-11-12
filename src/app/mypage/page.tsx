import AppBar from '@/components/app-bar/AppBar';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Settings from './components/Settings';

const MyPage = () => {
  return (
    <>
      <AppBar>마이페이지</AppBar>
      <main>
        <Profile />
        <Activity />
        <Settings />
      </main>
    </>
  );
};

export default MyPage;
