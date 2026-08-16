export function renderArrayView(shadowRoot, val) {
    const btn = document.createElement("button");
    btn.textContent = `View (${val.length})`;
    
    // Basic Tailwind-like inline styles for the button
    btn.style.cssText = "padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background-color: #f3f4f6; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer;";
    
    // Optional: Add hover effect via JS since it's inline
    btn.onmouseover = () => btn.style.backgroundColor = "#e5e7eb";
    btn.onmouseout = () => btn.style.backgroundColor = "#f3f4f6";
    
    shadowRoot.appendChild(btn);
}
