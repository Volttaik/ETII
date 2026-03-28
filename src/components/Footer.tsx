import { Instagram, Twitter, Youtube } from "lucide-react";

const socials = [
  { label: "@etii.official", handle: "Instagram", icon: Instagram, href: "#" },
  { label: "@etii", handle: "Twitter / X", icon: Twitter, href: "#" },
  { label: "ETII", handle: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex flex-col items-center text-center gap-8">
        <img
          src="https://images.fillout.com/orgid-635770/flowpublicid-w9xbmrnqsm/widgetid-default/vfW9UMxwE8iEG5Wf7sVwmx/pasted-image-1774727900439.jpg"
          alt="ETII"
          className="h-10 w-auto object-contain"
        />

        <p className="font-display text-sm italic text-muted-foreground tracking-wide">Threaded For You</p>

        <div className="flex flex-row flex-wrap items-center justify-center gap-6 sm:gap-10">
          {socials.map(({ label, handle, icon: Icon, href }) => (
            <a
              key={handle}
              href={href}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors duration-200">
                <Icon className="w-3.5 h-3.5 text-foreground group-hover:text-background transition-colors duration-200" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground group-hover:underline underline-offset-4 transition-all">{label}</p>
                <p className="text-xs text-muted-foreground">{handle}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">© 2025 ETII. All rights reserved.</p>
      </div>
    </footer>
  );
}
