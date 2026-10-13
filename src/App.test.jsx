import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { openEmailDraft } = vi.hoisted(() => ({ openEmailDraft: vi.fn() }));
vi.mock("./emailDraft.js", () => ({ openEmailDraft }));

import App from "./App.jsx";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = "";
  openEmailDraft.mockClear();
});

afterEach(cleanup);

describe("portfolio language", () => {
  it("switches to Portuguese and remembers the selection", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "PT" }));

    expect(screen.getByRole("heading", { level: 1, name: "Mais confiança em cada release." })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "pt-BR");
    expect(localStorage.getItem("portfolio-language")).toBe("pt");
  });

  it("restores the saved language on the next visit", () => {
    localStorage.setItem("portfolio-language", "pt");

    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "Mais confiança em cada release." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PT" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("portfolio navigation", () => {
  it("links each main navigation item to its page section", () => {
    render(<App />);

    for (const [label, sectionId] of [["Resume", "resume"], ["Blog", "blog"], ["Services", "services"], ["Contact", "contact"]]) {
      const link = screen.getByRole("link", { name: label, exact: true });
      expect(link).toHaveAttribute("href", `#${sectionId}`);
      expect(document.getElementById(sectionId)).toBeInTheDocument();
    }
  });

  it("provides email links for every service", () => {
    render(<App />);

    const serviceLinks = screen.getAllByRole("link", { name: "Ask about this service" });

    expect(serviceLinks).toHaveLength(3);
    expect(serviceLinks.map((link) => link.getAttribute("href"))).toEqual([
      "mailto:matsouzaleao@gmail.com?subject=Mentoring%20inquiry",
      "mailto:matsouzaleao@gmail.com?subject=Team%20training%20inquiry",
      "mailto:matsouzaleao@gmail.com?subject=Talk%20or%20workshop%20inquiry",
    ]);
  });

  it("keeps the public profile and email address reachable", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /matsouzaleao@gmail\.com/ })).toHaveAttribute(
      "href",
      "mailto:matsouzaleao@gmail.com",
    );
    const linkedInLinks = screen.getAllByRole("link", { name: "LinkedIn" });
    expect(linkedInLinks.length).toBeGreaterThan(0);
    linkedInLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/matheus-leao-br/");
      expect(link).toHaveAttribute("target", "_blank");
    });
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/matheus-leao");
  });
});

describe("translated portfolio content", () => {
  it("shows the résumé, blog, and services in the selected language", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "PT" }));

    expect(screen.getByRole("heading", { level: 2, name: "Experiência para elevar a qualidade." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Blog e links úteis." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Apoio prático para pessoas e equipes." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Mentoria individual" })).toBeInTheDocument();
  });
});

describe("contact inquiry", () => {
  it("requires a name, valid email, and message", () => {
    render(<App />);

    expect(screen.getByRole("textbox", { name: "Your name" })).toBeRequired();
    expect(screen.getByRole("textbox", { name: "Your email" })).toHaveAttribute("type", "email");
    expect(screen.getByRole("textbox", { name: "Your email" })).toBeRequired();
    expect(screen.getByRole("textbox", { name: "How can I help?" })).toBeRequired();
  });

  it("does not open an email draft when the address is invalid", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByRole("textbox", { name: "Your name" }), "Matheus Leao");
    await user.type(screen.getByRole("textbox", { name: "Your email" }), "not-an-email");
    await user.type(screen.getByRole("textbox", { name: "How can I help?" }), "I want to discuss mentoring.");
    await user.click(screen.getByRole("button", { name: "Draft an email" }));

    expect(openEmailDraft).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: "Your email" })).toBeInvalid();
  });

  it("opens an English email draft containing the visitor's details", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByRole("textbox", { name: "Your name" }), "Matheus Leao");
    await user.type(screen.getByRole("textbox", { name: "Your email" }), "matheus@example.com");
    await user.type(screen.getByRole("textbox", { name: "How can I help?" }), "I want to discuss mentoring.");
    await user.click(screen.getByRole("button", { name: "Draft an email" }));

    expect(openEmailDraft).toHaveBeenCalledWith(
      "mailto:matsouzaleao@gmail.com?subject=Portfolio%20inquiry&body=Name%3A%20Matheus%20Leao%0AEmail%3A%20matheus%40example.com%0A%0AI%20want%20to%20discuss%20mentoring.",
    );
    expect(screen.getByRole("status")).toHaveTextContent("Your email draft is ready in your email app.");
  });

  it("uses Portuguese labels and subject for a Portuguese email draft", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "PT" }));
    await user.type(screen.getByRole("textbox", { name: "Seu nome" }), "Matheus Leao");
    await user.type(screen.getByRole("textbox", { name: "Seu email" }), "matheus@example.com");
    await user.type(screen.getByRole("textbox", { name: "Como posso ajudar?" }), "Quero conversar sobre mentoria.");
    await user.click(screen.getByRole("button", { name: "Preparar email" }));

    expect(openEmailDraft).toHaveBeenCalledWith(
      "mailto:matsouzaleao@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio&body=Nome%3A%20Matheus%20Leao%0AEmail%3A%20matheus%40example.com%0A%0AQuero%20conversar%20sobre%20mentoria.",
    );
    expect(screen.getByRole("status")).toHaveTextContent("O rascunho está pronto no seu aplicativo de email.");
  });
});
