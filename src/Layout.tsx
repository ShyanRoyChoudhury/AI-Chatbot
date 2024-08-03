import Navigation from "./components/Navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="min-w-64 w-80">
        <Navigation />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
