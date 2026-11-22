// Project dialogs, lazy YouTube embeds, footer year. No dependencies.

document.querySelectorAll("[data-open]").forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.open);
  if (!dialog) return;
  trigger.addEventListener("click", () => dialog.showModal());
});

document.querySelectorAll("dialog.modal").forEach((dialog) => {
  dialog.querySelector("[data-close]")?.addEventListener("click", () => dialog.close());
  // Click on the backdrop closes the dialog.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  // Stop any playing video when the dialog closes.
  dialog.addEventListener("close", () => {
    dialog.querySelectorAll(".video iframe").forEach((frame) => {
      const holder = frame.parentElement;
      frame.remove();
      renderPoster(holder);
    });
  });
});

function renderPoster(holder) {
  const id = holder.dataset.yt;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("aria-label", `Play video: ${holder.dataset.title || "project video"}`);
  btn.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;
  btn.addEventListener("click", () => {
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = holder.dataset.title || "Project video";
    frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    frame.allowFullscreen = true;
    holder.replaceChildren(frame);
  });
  holder.replaceChildren(btn);
}
document.querySelectorAll(".video[data-yt]").forEach(renderPoster);

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
