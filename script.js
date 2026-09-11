// Show project photos when the corresponding files have been added.
document.querySelectorAll(".project-image[data-photo]").forEach((placeholder) => {
    const image = new Image();
    image.alt = placeholder.closest(".project").querySelector("h3").textContent;
    image.addEventListener("load", () => placeholder.replaceWith(image));
    image.src = `images/${placeholder.dataset.photo}`;
});

// Local file previews keep the placeholder; HTTP hosting can check for the PDF.
if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    fetch("resume.pdf", { method: "HEAD" })
        .then((response) => {
            if (!response.ok || !response.headers.get("content-type")?.includes("application/pdf")) return;
            const link = document.createElement("a");
            link.className = "button";
            link.href = "resume.pdf";
            link.target = "_blank";
            link.rel = "noopener";
            link.textContent = "View Resume (PDF)";
            document.querySelector("#resume .muted")?.replaceWith(link);
        })
        .catch(() => { /* Keep the placeholder if the PDF is unavailable. */ });
}
