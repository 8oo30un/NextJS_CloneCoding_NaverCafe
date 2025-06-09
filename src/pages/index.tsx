export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/CafeHomePage",
      permanent: false,
    },
  };
}

export default function Home() {
  return null;
}
