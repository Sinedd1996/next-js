import { GetServerSideProps } from 'next';

export default function Home() {
  return <div>Main PAGE</div>;
}

export const getServerSideProps: GetServerSideProps  = async (context) => {
  return { props: { serverCookies: context.req.headers?.cookie || ''} };
};
