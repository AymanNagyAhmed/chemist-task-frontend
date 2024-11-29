import Link from "next/link";
import Navbar from "@/components/Header/Navbar";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header className={`
      ${className}
      w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
    `}>
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
          >
            Your Logo
          </Link>

          {/* Navigation */}
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header; 