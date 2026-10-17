# Direção visual — floresta digital

Atualização local de 16/10/2026 para robinho.dev.

## Identidade

Fundo de terra escura (#17130f), cobre (#c99568), verde-musgo (#a6b78c) e texto em papel (#f1e8d9). O urso robótico representa a combinação de força, natureza e tecnologia. Serifas orgânicas nos destaques contrastam com a tipografia técnica dos rótulos.

O retrato e o emblema fornecidos em assets/images foram usados como referência de identidade. Os originais logo.png, icone.png e banner.png foram preservados. O banner azul com lobo saiu da composição; o emblema recebeu uma variante em cobre.

## Decisões de UX

- Abertura de 2,35 segundos, com botão para entrar imediatamente, uma vez por sessão. Sem abertura para quem prefere movimento reduzido.
- Composição principal com urso, parallax discreto e luz em movimento. Enquadramento próprio para celular para preservar o rosto.
- Manifesto com leitura progressiva, títulos que se encaixam, linhas que crescem e emblema que se monta em placas no scroll.
- Exemplos de automação interativos (Atendimento, Operação e Conteúdo), identificados como fluxos ilustrativos.
- Planos com índice de navegação direta. Sem sobreposição entre cards, para manter preços e botões acessíveis.
- Menu móvel com trava de scroll, foco de teclado e Escape. Contato flutuante só aparece quando as chamadas principais não estão em vista.
- Movimento reduzido respeitado, partículas pausadas quando a aba fica oculta e fonte limitada ao subconjunto latino.

## Artes e arquivos

Geração e edição pelo image_gen integrado, seguindo a skill imagegen. PNGs originais e versões JPEG de qualidade 88 estão salvos em src/assets/images. As versões JPEG são as consumidas pelo site.

| Arquivo | Uso |
| --- | --- |
| forest-guardian.png / forest-guardian.jpg | Urso na floresta com detalhes robóticos em bronze; fundo da abertura |
| logo-earth.png / logo-earth.jpg | Variante do emblema da marca em tons de cobre e marrom |
| bear-mark.svg | Símbolo vetorial do urso, também usado como favicon |

A conversão técnica para JPEG reduziu as duas artes de aproximadamente 5,5 MB para 789 KB, sem alterar suas dimensões. Os pôsteres dos planos foram mantidos e harmonizados visualmente pela apresentação em tons terrosos no CSS.

## Verificação

Build de produção com Vite e inspeção no Tabbit. Verificados: menu móvel (foco, trava de scroll e Escape), botão de entrada da introdução, ausência de repetição na sessão, três fluxos de automação, quatro atalhos de planos, carregamento das imagens e preferência de movimento reduzido. A montagem do emblema progrediu de 0,0665 a 1 conforme o scroll. Sem erros JavaScript observados. Larguras de 320, 390, 768, 820, 1280 e 1440 px sem rolagem horizontal ou palavras do título fora da tela.

## Prompt final — urso

Use case: stylized-concept. Asset type: cinematic editorial website hero background, wide landscape 3:2. Primary request: a majestic powerful brown bear, living organic fur blended subtly with precision bronze robotic plates along shoulder and copper circuit filaments; standing in an ancient Brazilian highland forest, earthy mist, massive roots, moss, fern, weathered wood. This embodies countryside roots and contemporary technology. Bear three-quarter front view occupies the RIGHT 55% of composition, gaze toward viewer, full head and upper body clearly visible; left 40% dark quiet forest negative space for HTML headline overlay. Subtle jade green fiber-optic strands weave through roots, a few amber fireflies. Beautiful realistic fur and industrial detailing, premium photographic art direction, not videogame, no cartoon. Colors: deep espresso brown, chestnut, muted olive green, parchment warm rim light, burnt copper. Deep shadow forest backdrop, warm beam through canopy. No blue, no cyan, no text, no watermarks, no logos, no letters, no user interface. The bear is the hero, robotics tasteful and evident, harmony between nature and machine.

## Prompt final — emblema

Referência de edição: src/assets/images/logo.png.

Use case: identity-preserve / style-transfer. Edit the supplied robinho.dev brand emblem image. Preserve exactly the same man's illustrated face, glasses, cap, portrait proportions and visual identity; preserve circle and cross placement and letter shapes, the exact text ROBINHO.DEV and ESTRATÉGIA • CÓDIGO • PROPÓSITO. Change ALL the electric blue palette and background to a sophisticated warm woodland palette: very dark espresso brown and charred wood grain background, bronze/copper circle and circuits, warm ivory and copper wordmark; olive-black hoodie and cap, natural skin tones remain. Replace blue glow with restrained golden amber rim light. Premium rustic technology brand, tactile wood and brushed bronze finish. Square composition same as original, high text fidelity, no additional content. Background edges very dark espresso #17130f to blend into a brown website. Do not change the face.

