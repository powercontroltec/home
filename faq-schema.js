<script>
(function() {
  // Seleciona todas as perguntas e respostas
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  // Monta o objeto JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question')?.innerText.trim();
    const answer = item.querySelector('.faq-answer')?.innerText.trim();

    if (question && answer) {
      faqSchema.mainEntity.push({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      });
    }
  });

  // Cria e injeta o script JSON-LD na página
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(faqSchema, null, 2);
  document.head.appendChild(script);
})();
</script>