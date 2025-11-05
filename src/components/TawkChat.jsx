import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function TawkChat() {
  const TAWK_PROPERTY_ID = '68ffda2105d3d8194aaa21ad';
  const TAWK_WIDGET_ID = '1j8jmo4rv';

  useEffect(() => {
    if (!window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);

      window.Tawk_API.onLoad = function() {
        window.Tawk_API.setAttributes({
          name: 'Visitor',
          email: ''
        });
      };
    }
  }, []);

  return null;
}
