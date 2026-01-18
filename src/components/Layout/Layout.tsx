import Modal from "../Modal/Modal";
import { Navbar } from "../NavBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <>
      <div className="h-screen flex flex-col">
        <header className="shrink-0">
          <Navbar />
        </header>
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </div>
      <Modal />
    </>
  );
}