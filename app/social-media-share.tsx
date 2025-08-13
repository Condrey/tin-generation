"use client";
import { Button } from "@/components/ui/button";
import { CopyIcon, FacebookIcon, PhoneIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SocialMediaShare() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    toast.info("Linked copied to clipboard");
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(siteUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      siteUrl,
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      siteUrl,
    )}`,
  };

  return (
    <div className="max-w-sm me-auto flex items-center justify-center gap-1.5">
      <span className="hidden sm:flex">Share Link: </span>
      <Link
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white hover:bg-green-300 p-2 rounded-full"
        title="Share on WhatsApp"
      >
        <PhoneIcon className="fill-white" size={15} />
      </Link>
      <Link
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-300 p-2 rounded-full"
        title="Share on Facebook"
      >
        <FacebookIcon className="fill-white" size={15} />
      </Link>
      <Link
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black hover:bg-gray-900 p-2 rounded-full "
        title="Share on Twitter"
      >
        <TwitterIcon size={15} />
      </Link>
      <Button
        onClick={handleCopy}
        className="bg-primary hover:bg-primary/50 p-2 rounded-full size-8 "
        title="Copy Link"
      >
        <CopyIcon size={15} />
      </Button>
    </div>
  );
}
