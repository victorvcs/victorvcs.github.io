// Linha do tempo em storytelling: hover, foco ou clique troca a história; passa sozinha enquanto ninguém mexe.
(() => {
  const tl = document.querySelector('.timeline');
  const box = document.querySelector('.tl-story');
  if (!tl || !box) return;
  const M = n => `assets/img/marca-${n}.png`;
  const STORIES = [
    { layer: 'Código e design', title: 'Onde tudo começou', text: 'Entrei como designer de interface e dev front-end no maior varejo digital do país e cresci até UX Lead, cuidando de produtos de mídia e de afiliados.', brands: [['Americanas', M('americanas')], ['Submarino', M('submarino')], ['Shoptime', M('shoptime')], ['Afiliados.com', M('afiliados')], ['B2W Ads', M('b2w-ads')], ['Admatic', M('admatic')]], kpis: [['15 → 53','NPS da plataforma de afiliados'],['24%','do GMV da Black Friday via afiliados']] },
    { layer: 'Negócio próprio', title: 'A primeira startup', text: 'Cofundei uma plataforma de acordos online. Validamos a ideia com um MVP feito em 2 dias, crescemos com clientes white label e saímos com a empresa lucrativa.', brands: [], kpis: [['2 dias','para o MVP ir ao ar'],['10 mil','casos em 5 meses'],['+180 mil','casos e exit']] },
    { layer: 'Produto e UX', title: 'Apps para grandes operadoras', text: 'Liderei produto e UX de apps de notícias e mídia para grandes operadoras de telecom, com design system e entregas mais rápidas.', brands: [['Oi Jornais', M('oi-jornais')], ['Vivo News', M('vivo-news')], ['TIM Banca Virtual', M('tim-banca')], ['Áudio News', M('audio-news')]], kpis: [['1,3 → 4,6','nota nas lojas de apps'],['3x','entregas mais rápidas'],['−30%','chamados no suporte']] },
    { layer: 'Produto mobile e growth', title: 'Escala num marketplace', text: 'Gerente de produto mobile num marketplace de serviços, com foco em ativar e reter os profissionais que atendem os clientes.', brands: [], kpis: [['+155%','de ativação, recorde em 2022'],['4,5x','mais recorrência'],['+22%','de downloads']] },
    { layer: 'Negócio próprio', title: 'Uma legaltech do zero', text: 'Sócio e head de produto de uma legaltech que conectava pessoas à Justiça por meio de advogados, reduzindo o tempo para entrar com uma ação.', brands: [], kpis: [['5% → 15%','take rate'],['7','de ROI em aquisição']] },
    { layer: 'Inovação aberta', title: 'Startups dentro de uma gigante de energia', text: 'Estruturei o programa de inovação aberta com startups: pilotos rápidos, medidos de perto, e metade deles virando projeto.', brands: [['PowerUp Eletrobras', M('powerup')], ['Innovation Grid', M('innovation-grid')]], kpis: [['25','iniciativas em 9 meses'],['50%','das POCs viraram escala'],['5','polos de inovação']] },
    { layer: 'Inovação e educação', title: 'Inovação com grandes empresas', text: 'Coordenei produtos e programas de inovação com grandes empresas, incluindo as certificações executivas ANPEI Architect e eventos de inovação: curadoria de temas, palestrantes, agenda, produção e facilitação.', brands: [['ANPEI Architect', M('anpei-architect')], ['Comitês Temáticos', M('anpei-comites')], ['Rotas Inovadoras', M('rotas-inovadoras')]], kpis: [['+R$27MM','em valor gerado'],['+1.100','conexões'],['+450','formados'],['+19','eventos de inovação']] },
    { layer: 'Negócio + IA', title: 'Da ideia à solução validada', text: 'Uso a visão de negócio e a inteligência artificial para criar soluções e validar produtos rápido, como o SIPC, plataforma de estudos com IA que é a artefato da minha proposta de mestrado no PPGOCTS/UFRJ e está em validação.', brands: [], kpis: [['7 semanas','do 1º commit à versão 1.7 do SIPC']], link: ['Abrir o SIPC →', 'https://victorvcs.github.io/sipc/'] },
  ];
  const items = [...tl.children];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = 6000;
  let cur = -1, timer = null, auto = !reduce, visible = false;

  tl.classList.add('story-on');
  items.forEach((li, i) => {
    li.tabIndex = 0;
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', `${li.querySelector('.year').textContent}: ${li.querySelector('.co').textContent}. Ver história`);
    const pick = () => { stop(); show(i); };
    li.addEventListener('mouseenter', pick);
    li.addEventListener('focus', pick);
    li.addEventListener('click', pick);
  });

  box.innerHTML = `<div class="tl-left"><div class="tl-year"></div><p class="tl-count"></p></div>
    <div class="tl-right"><span class="tl-layer"></span><h3 class="tl-title"></h3><p class="tl-text"></p><div class="tl-kpis"></div><div class="tl-brands"></div></div>
    <div class="tl-nav"><button type="button" data-d="-1" aria-label="História anterior">←</button><button type="button" data-d="1" aria-label="Próxima história">→</button></div>
    <span class="tl-bar"></span>`;
  const $ = s => box.querySelector(s);
  box.querySelectorAll('.tl-nav button').forEach(b => b.addEventListener('click', () => { stop(); show((cur + Number(b.dataset.d) + items.length) % items.length); }));

  const restartBar = () => { const bar = $('.tl-bar'); bar.classList.remove('run'); void bar.offsetWidth; if (auto && visible) { bar.style.setProperty('--dur', DUR + 'ms'); bar.classList.add('run'); } };

  function show(i) {
    if (i === cur) return;
    cur = i;
    const li = items[i], s = STORIES[i];
    items.forEach((el, k) => { el.classList.toggle('active', k === i); el.classList.toggle('passed', k < i); });
    $('.tl-year').textContent = li.querySelector('.year').textContent;
    $('.tl-count').textContent = `${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    $('.tl-layer').textContent = s.layer;
    $('.tl-title').innerHTML = `${s.title} <span>· ${li.querySelector('.co').textContent}</span>`;
    $('.tl-text').textContent = s.text;
    $('.tl-kpis').innerHTML = (s.kpis || []).map(([n, t], k) => `<div style="--i:${k}"><b>${n}</b><span>${t}</span></div>`).join('');
    $('.tl-brands').innerHTML = s.brands.map(([alt, src], k) => `<span style="--i:${k};--r:${(k % 2 ? 1 : -1) * (1 + k % 3)}deg"><img src="${src}" alt="${alt}" loading="lazy"></span>`).join('') + (s.link ? `<a class="tl-link" href="${s.link[1]}" target="_blank" rel="noopener">${s.link[0]}</a>` : '');
    ['.tl-left', '.tl-right'].forEach(sel => { const el = $(sel); el.classList.remove('tl-swap'); void el.offsetWidth; el.classList.add('tl-swap'); });
    restartBar();
  }
  const next = () => show((cur + 1) % items.length);
  function play() { clearInterval(timer); if (auto && visible) { timer = setInterval(next, DUR); restartBar(); } }
  function stop() { auto = false; clearInterval(timer); $('.tl-bar').classList.remove('run'); }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) play(); else clearInterval(timer); }, { threshold: .35 }).observe(box);
  show(0);
})();

// Abas (resultados e certificações); setas do teclado trocam de aba.
document.querySelectorAll('.rtabs').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const select = (t, focus) => {
    tabs.forEach(b => {
      const on = b === t;
      b.setAttribute('aria-selected', on);
      b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });
});
