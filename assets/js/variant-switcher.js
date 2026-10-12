/**
 * Floating Variant Switcher Bar
 * Updated to make index.html the primary Compare All Hub
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const variants = [
    { name: '← Compare All Hub', file: 'index.html', tag: 'Client Showcase Hub' },
    { name: '1. Swiss Minimal', file: 'variant-swiss-minimal.html', tag: 'Nordic Grid' },
    { name: '2. Editorial Ivy', file: 'variant-editorial-ivy.html', tag: 'Warm Literary' },
    { name: '3. Future STEAM', file: 'variant-future-steam.html', tag: 'Tech Minimal' },
    { name: '4. Zen Organic', file: 'variant-zen-nature.html', tag: 'Earth & Nature' },
    { name: '5. Flagship Prep', file: 'flagship-prep.html', tag: 'Classic Heritage' }
  ];

  const bar = document.createElement('div');
  bar.id = 'variant-switcher-bar';
  bar.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-full shadow-2xl border border-white/20 flex items-center gap-1.5 text-xs max-w-[95vw] overflow-x-auto';

  bar.innerHTML = `
    <div class="flex items-center gap-1.5 pl-2 pr-2 border-r border-white/20 shrink-0 text-slate-300 font-medium">
      <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
      <span class="hidden sm:inline">Design Variant:</span>
    </div>
    <div class="flex items-center gap-1 shrink-0">
      ${variants.map(v => {
        const isActive = (currentPath === v.file) || (currentPath === '' && v.file === 'index.html');
        return `
          <a href="${v.file}" 
             class="px-3 py-1.5 rounded-full transition-all text-[11px] font-semibold whitespace-nowrap ${
               isActive
                 ? 'bg-amber-400 text-slate-950 shadow font-bold'
                 : 'text-slate-300 hover:text-white hover:bg-white/10'
             }" title="${v.tag}">
            ${v.name}
          </a>
        `;
      }).join('')}
    </div>
  `;

  document.body.appendChild(bar);
});
