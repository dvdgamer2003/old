// Helper functions for URL handling
export function getProxiedUrl(url: string): string {
  try {
    // Validate URL
    const urlObj = new URL(url);
    
    // List of domains that need proxy
    const problematicDomains = [
      'washingtonpost.com',
      'wsj.com',
      'ft.com',
      'bloomberg.com',
      'nytimes.com'
    ];
    
    const domain = urlObj.hostname.replace('www.', '');
    
    // Use 12ft.io as proxy for paywalled sites
    if (problematicDomains.some(d => domain.includes(d))) {
      return `https://12ft.io/${url}`;
    }
    
    return url;
  } catch (error) {
    console.error('Invalid URL:', error);
    return url;
  }
}

export function openArticle(url: string): void {
  try {
    const finalUrl = getProxiedUrl(url);
    
    // Open in new tab instead of current window
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error opening article:', error);
    // Fallback to opening in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}