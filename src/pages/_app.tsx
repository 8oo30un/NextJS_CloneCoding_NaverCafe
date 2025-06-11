// pages/_app.tsx
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import BarHeader from "@/components/barHeader";
import "@/styles/globals.css";
import BarSide from "@/components/barSide";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 바 헤더를 숨길 경로 리스트
  const hideHeaderRoutes = ["/login", "/register"]; // 필요한 경로 추가

  const shouldHideHeader = hideHeaderRoutes.includes(router.pathname);

  return (
    <>
      {!shouldHideHeader && <BarHeader />}
      {!shouldHideHeader && <BarSide />}

      <Component {...pageProps} />
    </>
  );
}
