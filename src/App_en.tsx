import React, { useEffect, useState } from "react";
import "./App.css";

interface Project {
  id: number;
  title: string;
  description: string;
  blessing: string;
  defaultAmount: number;
  images: string[];
}

interface Petal {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

interface Props {
  onSwitchToSinhala: () => void;
}

const projectData: Project[] = [
  {
    id: 1,
    title: "Umandawa Scholarship Program",
    description:
      "Umandawa provides monthly scholarships to talented students facing financial difficulties. You too can contribute to this program and help nurture the next generation of leaders.",
    blessing: "May joy and prosperity come to you",
    defaultAmount: 5000,
    images: ["/p1_img1.jpg", "/p1_img2.jpg", "/p1_img3.jpg", "/p1_img4.jpg", "/p1_img5.jpg", "/p1_img6.jpg"],
  },
  {
    id: 2,
    title: "Water Project for Wild Elephants",
    description:
      "Umandawa is implementing a project to restore a pond at Habarana Eco Park to provide drinking water for wild elephants, protecting both their lives and the environment. You can support this noble initiative.",
    blessing: "May good fortune come to all beings",
    defaultAmount: 5000,
    images: ["/p2_img1.jpg", "/p2_img2.jpg", "/p2_img3.jpg", "/p2_img4.jpg", "/p2_img5.jpg"],
  },
  {
    id: 3,
    title: "Rural Entrepreneurship Project",
    description:
      "Umandawa has launched a program to prepare new entrepreneurs to help communities in disadvantaged villages overcome economic challenges. Food production and training programs in Vavuniya mark the first phase.",
    blessing: "May your kindness be an eternal light",
    defaultAmount: 5000,
    images: ["/p3_img1.jpg", "/p3_img2.jpg", "/p3_img3.jpg", "/p3_img4.jpg", "/p3_img5.jpg"],
  },
  {
    id: 4,
    title: "School Cricket Development Project",
    description:
      "Umandawa operates a special program providing equipment and training to develop cricket in under-resourced schools. You can contribute to this noble mission.",
    blessing: "May your contribution nurture a new generation",
    defaultAmount: 5000,
    images: ["/p4_img1.jpg", "/p4_img2.jpg", "/p4_img3.jpg", "/p4_img4.jpg", "/p4_img5.jpg", "/p4_img6.jpg"],
  },
  {
    id: 5,
    title: "Dana for Both Orders of Sangha",
    description:
      "Umandawa offers you the noble opportunity to offer dana (alms) to the monks and nuns of the Buddhist community at the Global Buddhist Village. May the purity of merit remain in your life.",
    blessing: "A world filled with merit through service to the Sangha",
    defaultAmount: 5000,
    images: ["/p5_img1.jpg", "/p5_img2.jpg", "/p5_img3.jpg", "/p5_img4.jpg", "/p5_img5.jpg"],
  },
  {
    id: 6,
    title: "School Model Garden Cultivation Project",
    description:
      "The agricultural revolution implemented by Umandawa is being extended to schools, providing students with knowledge about home gardening. The first phase began at Richmond College, Galle.",
    blessing: "May hearts be purified through flowering gardens",
    defaultAmount: 5000,
    images: ["/p6_img1.jpg", "/p6_img2.jpg", "/p6_img3.jpg", "/p6_img4.jpg"],
  },
];

const App: React.FC<Props> = ({ onSwitchToSinhala }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [slideIndexes, setSlideIndexes] = useState<number[]>(() => projectData.map(() => 0));

  const donate = async (projectId: number) => {
    const project = projectData.find((item: Project) => item.id === projectId);

    if (!project) {
      console.error(`Project with id ${projectId} not found.`);
      return;
    }

    const amountInput = document.getElementById(`amount-${projectId}`) as HTMLInputElement | null;
    const rawAmount = amountInput?.value || project.defaultAmount.toString();
    const parsedAmount = parseFloat(rawAmount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const response = await fetch("https://umandawa-backend.onrender.com/api/donation/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedAmount.toFixed(2),
          currency: "LKR",
        })
      });

      if (!response.ok) {
        throw new Error(`Donation request failed with status ${response.status}`);
      }

      const html = await response.text();

      document.open();
      document.write(html);
      document.close();

    } catch (error) {
      console.error("Donation request failed", error);
      alert("An error occurred while completing the donation. Please try again.");
    }
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(30px)";
      (card as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    const handleScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          (card as HTMLElement).style.opacity = "1";
          (card as HTMLElement).style.transform = "translateY(0)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(() => window.dispatchEvent(new Event("scroll")), 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const intervals = projectData.map((project: Project, index: number) => {
      if (project.images.length <= 1) {
        return null;
      }

      return window.setInterval(() => {
        setSlideIndexes((prev) => {
          const next = [...prev];
          next[index] = ((prev[index] ?? 0) + 1) % project.images.length;
          return next;
        });
      }, 5000);
    });

    return () => {
      intervals.forEach((intervalId: number | null) => {
        if (intervalId) {
          window.clearInterval(intervalId);
        }
      });
    };
  }, []);

  useEffect(() => {
    const newPetals = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${5 + Math.random() * 10}s`
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      <div className="decorative-pattern"></div>
      <div className="falling-petals">
        {petals.map((petal) => (
          <div key={petal.id} className="petal" style={{
            left: petal.left,
            animationDelay: petal.animationDelay,
            animationDuration: petal.animationDuration
          }}>
            🪻
          </div>
        ))}
      </div>

      <div className="container">
        <header className="hero">
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <img src="/logo.jpg" alt="Umandawa Logo" className="temple-logo" />
            <button 
              className="language-btn" 
              onClick={onSwitchToSinhala}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Sinhala
            </button>
            <h1 className="hero-title">Umandawa Support</h1>
            <p className="hero-subtitle">Awakening Humanity • Preserving Compassion • Building a Peaceful Future</p>

            <p className="hero-text">
              <strong>Umandawa Global Buddhist Village</strong> is a living model demonstrating harmony between spiritual awakening and sustainable living.
              Your contribution empowers projects in education, environment, community development, and dharma service — helping to create a world of mindfulness and compassion.
            </p>

            <a href="#projects" className="hero-btn">Donate Now</a>
          </div>
        </header>

        <div className="divider">❁ ☸ ❁</div>
        {/* About Section (Image + Description) */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-image">
              <img src="/img.jpg" alt="Path of Enlightenment Temple" />
            </div>
            <div className="about-text">
              <h2> Siri Samanthabhadra Maha Arahath Thero</h2>
              <p>
                Venerable Samanthabhadra Maha Arahath Thero Thero is a humble beacon of light in the Dhamma, dedicated to guiding all beings toward peace, wisdom, and compassion.
                Through his gentle teachings and tireless service, he nurtures the spiritual growth of countless devotees,
                encouraging mindfulness and loving-kindness in daily life. His vision extends beyond temple walls — awakening hearts to the timeless truths of the Buddha's path.
              </p>
              <p>
                With your generous support, the Venerable Thero's mission of compassion and wisdom continues to flourish.
                Every offering you make becomes a seed of merit, sustaining his efforts to spread the light of the Dhamma,
                uplift communities, and build a foundation of peace for generations to come.
              </p>
            </div>
          </div>
        </section>

        <div className="projects-section" id="projects">
          {projectData.map((project: Project, index: number) => {
            const currentImageIndex = slideIndexes[index] ?? 0;
            const currentImage = project.images[currentImageIndex] || project.images[0];

            return (
              <div key={project.id} className="project-card h-full flex justify-center items-center">
                <div className="project-image h-full">
                  <img src={currentImage} alt={project.title} className="w-full h-full" />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="donation-section">
                    <div className="donation-amount">
                      <input
                        type="number"
                        id={`amount-${project.id}`}
                        placeholder="Enter amount ($)"
                        min={1}
                        defaultValue={project.defaultAmount}
                      />
                    </div>
                    <button className="donate-btn" onClick={() => donate(project.id)}>
                      Donate
                    </button>
                  </div>
                  <p className="blessing-text">{project.blessing}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lotus-decoration">☸ 🪷 ☸</div>

        <footer>
          <p>
            <strong>
              "Just as a candle cannot burn without fire, we cannot live without a spiritual life."
            </strong>
          </p>
          <p>— Buddha</p>
          <div className="contact-info">
            <p><strong>Contact Information</strong></p>
            <p>☎ +94 775 440 888</p>
            <p>☎ +94 766 730 630</p>
            <p>📧 info@umandawa.com</p>
            <p>🌐 www.umandawa.com</p>
            <p>📍 Umandawa Maha Vihara Ashramya,<br />
              9th post, Alipallama,<br />
              Madahapola, Kurunagala,<br />
              Sri Lanka.</p>
            <p>© 2025 Umandawa. Developed By Ceylon Innovation</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;