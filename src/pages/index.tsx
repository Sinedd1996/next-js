import { setError } from "@/store/slices/errorMessageSlice";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();

  return (
    <div>
      Main PAGE
      <button
        onClick={() =>
          dispatch(
            setError({
              error: "Hello world!!!",
            })
          )
        }
      >
        example click
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { serverCookies: context.req.headers?.cookie || "" } };
};
