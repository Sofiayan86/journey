import { Mail, Github, Instagram, Linkedin, Twitter } from "lucide-react";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
  ownerName?: string;
}

export default function Footer({ socialLinks = [], ownerName = "Travel Blogger" }: FooterProps) {
  const defaultSocialLinks: SocialLink[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:hello@example.com",
      label: "Email",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
  ];

  const links = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide">
              About
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              A personal travel magazine celebrating journeys, cultures, and discoveries around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/articles" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Articles
                </a>
              </li>
              <li>
                <a href="/map" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Map
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Follow
            </h3>
            <div className="flex gap-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  title={link.label}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} {ownerName}. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Built with passion for travel and storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
}

