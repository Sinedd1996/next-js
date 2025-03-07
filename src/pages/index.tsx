export default function Home() {
  return <div>Main PAGE</div>;
}

export const getServerSideProps = async () => {
  const isAuth = true;

  return { props: { isAuth } };
};
