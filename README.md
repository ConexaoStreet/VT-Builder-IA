# VT Builder IA

Protótipo de front-end para uma plataforma de criação com IA. O projeto reúne páginas de apresentação, dashboard, onboarding, chat e workspace.

## Tecnologias

HTML, CSS e JavaScript, sem um backend versionado neste repositório.

## Recursos presentes

- Navegação entre páginas e prévias de interface.
- Histórico de projetos e mensagens salvo em localStorage.
- Seleção de projeto ativo.
- Composição de mensagens e adaptação da interface para telas menores.

## Limites do protótipo

O chat utiliza respostas fixas para demonstrar a interação. Ele não chama um modelo de IA nem gera ou modifica código de verdade.

Os dados ficam no navegador utilizado. Autenticação, banco de dados compartilhado, integração com IA e publicação de projetos não estão implementados neste repositório.

## Executar localmente

Abra index.html no navegador. Para servir os arquivos por HTTP, com Python instalado:

```bash
python -m http.server 8000
```

Abra http://localhost:8000. O Python serve os arquivos estáticos neste exemplo; ele não faz parte do backend do projeto.

## Arquivos principais

index.html, dashboard.html, chat.html, onboarding.html e workspace.html, acompanhados dos respectivos estilos e scripts.

## Estado

Protótipo de interface em desenvolvimento. Revise e valide os fluxos antes de qualquer uso real.
