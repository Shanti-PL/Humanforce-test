import Image from "next/image";

export default function Footer({ brand, social, footer }) {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    LinkedIn: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    Facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  };

  const socialLinks =
    social?.map((s) => ({
      ...s,
      icon: socialIcons[s.name] || socialIcons.LinkedIn,
    })) || [];

  return (
    <footer className="w-full bg-foreground text-background py-12 md:py-16">
      <div className="container px-4 2xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <a href="#">
              <Image
                src={brand.logo}
                alt={brand.name}
                className="w-auto h-10"
                width={400}
                height={100}
                sizes="(max-width: 768px) 100vw, 400px"
                loading="lazy"
              />
            </a>
            <p className="text-background/70 mb-6 max-w-sm mt-4">
              {footer.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background/10 hover:bg-primary text-background hover:text-foreground transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 text-[12px] sm:text-sm">
            <p className="text-background/70">
              © {currentYear} {brand.name} All rights reserved.
            </p>
            <p className="text-background/70">{footer.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
