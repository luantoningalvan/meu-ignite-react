export const UtterancesComments: React.FC = () => (
  <section
    style={{ marginTop: "5rem" }}
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.crossOrigin = "anonymous";
      scriptElem.setAttribute(
        "repo",
        "luantoningalvan/ignite-template-reactjs-criando-um-projeto-do-zero"
      );
      scriptElem.setAttribute("issue-term", "pathname");
      scriptElem.setAttribute("label", "blog-comment");
      scriptElem.setAttribute("theme", "github-dark");
      elem.appendChild(scriptElem);
    }}
  />
);
