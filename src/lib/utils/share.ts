import { toast } from 'react-hot-toast';

interface ShareData {
  title: string;
  url: string;
  text?: string;
}

interface SocialShareUrls {
  whatsapp: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  telegram: string;
}

export function generateShareUrls(data: ShareData): SocialShareUrls {
  if (!data?.url || !data?.title) {
    throw new Error('URL and title are required for sharing');
  }

  // Ensure we have the full URL by checking if it's relative
  const fullUrl = data.url.startsWith('http') 
    ? data.url 
    : `${window.location.origin}/article/${encodeURIComponent(data.url)}`;
    
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(data.title);
  const encodedText = encodeURIComponent(data.text || '');

  return {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };
}

export async function shareContent(data: ShareData): Promise<boolean> {
  if (!data?.url || !data?.title) {
    toast.error('Unable to share article');
    return false;
  }

  try {
    // Ensure we have the full URL
    const fullUrl = data.url.startsWith('http') 
      ? data.url 
      : `${window.location.origin}/article/${encodeURIComponent(data.url)}`;
    
    // Try native sharing first
    if (navigator.share) {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: fullUrl,
      });
      return true;
    }
    
    // Fallback to clipboard
    await navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
    return true;
  } catch (error) {
    // Don't show error for user cancellation
    if (error instanceof Error && error.name === 'AbortError') {
      return false;
    }
    
    console.error('Sharing failed:', error);
    toast.error('Failed to share article');
    return false;
  }
}