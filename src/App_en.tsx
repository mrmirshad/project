import React, { useEffect, useState } from "react";
import "./App.css";
import CyberSourcePaymentPage from "./components/CyberSourcePaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import { useNavigate } from "react-router-dom";

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

interface CountryCodeOption {
  code: string;
  label: string;
}

const projectData: Project[] = [
  {
    id: 1,
    title: "Umandawa Scholarship Program",
    description:
      "Umandawa provides monthly scholarships to students who excel academically but face financial difficulties. You too can participate in this program.",
    blessing: "May happiness and prosperity come to you",
    defaultAmount: 5000,
    images: ["/p1_img1.jpg", "/p1_img2.jpg", "/p1_img3.jpg", "/p1_img4.jpg", "/p1_img5.jpg", "/p1_img6.jpg"],
  },
  {
    id: 2,
    title: "Water Project for Wild Elephants",
    description:
      "Umandawa has implemented a project to protect the lives and habitat of wild elephants by renovating a pond at Habarana Eco Park to meet the drinking water needs of elephants. You can also support this noble initiative.",
    blessing: "May good fortune come to all living beings",
    defaultAmount: 5000,
    images: ["/p2_img1.jpg", "/p2_img2.jpg", "/p2_img3.jpg", "/p2_img4.jpg", "/p2_img5.jpg"],
  },
  {
    id: 3,
    title: "Entrepreneurial Village Project",
    description:
      "Umandawa has launched a program to prepare new entrepreneurs to help people in difficult villages overcome economic challenges. Food production and training programs in Vavuniya are the first phase.",
    blessing: "May your kindness be an eternal light",
    defaultAmount: 5000,
    images: ["/p3_img1.jpg", "/p3_img2.jpg", "/p3_img3.jpg", "/p3_img4.jpg", "/p3_img5.jpg"],
  },
  {
    id: 4,
    title: "School Cricket Development Project",
    description:
      "Umandawa operates a special program providing equipment and training for the development of cricket in schools with limited facilities. You too can contribute to this noble mission.",
    blessing: "May your contribution nurture a new generation",
    defaultAmount: 5000,
    images: ["/p4_img1.jpg", "/p4_img2.jpg", "/p4_img3.jpg", "/p4_img4.jpg", "/p4_img5.jpg", "/p4_img6.jpg"],
  },
  {
    id: 5,
    title: "Offerings for Both Sangha",
    description:
      "Umandawa offers you the sacred opportunity to make offerings to the monks and nuns of the Buddhist global village. May the purity of merit remain in your life.",
    blessing: "A world filled with merit through service to the Sangha",
    defaultAmount: 5000,
    images: ["/p5_img1.jpg", "/p5_img2.jpg", "/p5_img3.jpg", "/p5_img4.jpg", "/p5_img5.jpg"],
  },
  {
    id: 6,
    title: "School Model Garden Project",
    description:
      "This is a program that extends the agricultural revolution carried out by Umandawa to schools, providing students with knowledge about home gardening. The first phase began at Richmond College, Galle.",
    blessing: "May hearts be purified through blooming gardens",
    defaultAmount: 5000,
    images: ["/p6_img1.jpg", "/p6_img2.jpg", "/p6_img3.jpg", "/p6_img4.jpg"],
  },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const [petals, setPetals] = useState<Petal[]>([]);
  const [slideIndexes, setSlideIndexes] = useState<number[]>(() => projectData.map(() => 0));
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [showCyberSource, setShowCyberSource] = useState(false);
  const [countryCodes, setCountryCodes] = useState<CountryCodeOption[]>([]);
  const [countryCodesLoading, setCountryCodesLoading] = useState(false);
  const [countryCodesError, setCountryCodesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      setCountryCodesLoading(true);
      setCountryCodesError(null);

      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');

        if (!response.ok) {
          throw new Error(`Failed to load country codes (${response.status})`);
        }

        type RestCountry = {
          name?: { common?: string };
          idd?: { root?: string; suffixes?: string[] };
        };

        const data: RestCountry[] = await response.json();

        const options: CountryCodeOption[] = data
          .flatMap((country) => {
            const root = country.idd?.root;
            const suffixes = country.idd?.suffixes;

            if (!root || !suffixes || suffixes.length === 0) {
              return [];
            }

            return suffixes.map((suffix) => {
              const dialCode = `${root}${suffix}`.replace(/[^+\d]/g, '');
              const countryName = country.name?.common ?? 'Unknown';

              return {
                code: dialCode,
                label: `${countryName} (${dialCode})`,
              } satisfies CountryCodeOption;
            });
          })
          .filter((option) => option.code)
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountryCodes(options);
      } catch (error) {
        console.error('Failed to fetch country codes', error);
        setCountryCodesError('Unable to load country codes. Please try again later.');
      } finally {
        setCountryCodesLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  const donate = async (projectId: number) => {
    const project = projectData.find((item: Project) => item.id === projectId);

    if (!project) {
      console.error(`Project with id ${projectId} not found.`);
      return;
    }

    const amountInput = document.getElementById(`amount-${projectId}`) as HTMLInputElement | null;
    const countryCodeSelect = document.getElementById(`countryCode-${projectId}`) as HTMLSelectElement | null;
    const mobileInput = document.getElementById(`mobile-${projectId}`) as HTMLInputElement | null;
    const emailInput = document.getElementById(`email-${projectId}`) as HTMLInputElement | null;
    const firstNameInput = document.getElementById(`firstName-${projectId}`) as HTMLInputElement | null;
    const lastNameInput = document.getElementById(`lastName-${projectId}`) as HTMLInputElement | null;

    const rawAmount = amountInput?.value || project.defaultAmount.toString();
    const parsedAmount = parseFloat(rawAmount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const firstName = firstNameInput?.value?.trim();
    if (!firstName) {
      alert("Please enter your first name.");
      return;
    }

    const lastName = lastNameInput?.value?.trim();
    if (!lastName) {
      alert("Please enter your last name.");
      return;
    }

    const countryCodeValue = countryCodeSelect?.value || '';
    if (!countryCodeValue) {
      alert("Please select a country code.");
      return;
    }

    const localMobileValue = mobileInput?.value.trim() || '';
    if (!localMobileValue) {
      alert("Please enter a valid mobile number with country code.");
      return;
    }

    if (!/^\d+$/.test(localMobileValue)) {
      alert("Please enter a valid mobile number (numbers only).");
      return;
    }

    if (localMobileValue.charAt(0) === '0') {
      alert("Please enter a valid mobile number with country code.");
      return;
    }

    const mobileValue = `${countryCodeValue}${localMobileValue}`;

    const emailValue = emailInput?.value || '';
    if (!emailValue.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Instead of starting DirectPay, set up for CyberSource
    setSelectedAmount(parsedAmount);
    setMobile(mobileValue);
    setEmail(emailValue);
    setFirstName(firstName);
    setLastName(lastName);
    // Store additional data for CyberSource
    setShowCyberSource(true);
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
      animationDuration: `${5 + Math.random() * 10}s`,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      {showCyberSource ? (
        <CyberSourcePaymentPage
          amount={selectedAmount || 0}
          email={email}
          mobile={mobile}
          firstName={firstName}
          lastName={lastName}
          onBack={() => setShowCyberSource(false)}
        />
      ) : (
        <>
          <div className="decorative-pattern"></div>
          <div className="falling-petals">
            {petals.map((petal) => (
              <div
                key={petal.id}
                className="petal"
                style={{
                  left: petal.left,
                  animationDelay: petal.animationDelay,
                  animationDuration: petal.animationDuration,
                }}
              >
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
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.localStorage.setItem("lang", "si");
                    }
                    navigate("/");
                  }}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "linear-gradient(135deg, #8b6f47 0%, #6b4423 100%)",
                    color: "#ffffff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  සිංහල
                </button>

                <h1 className="hero-title">Umandawa Support</h1>
                <p className="hero-subtitle">
                  Awakening Humanity • Preserving Compassion • Building a Peaceful Future
                </p>

                <p className="hero-text">
                  <strong>Umandawa Global Buddhist Village</strong> is a living model demonstrating harmony between spiritual awakening and sustainable living. Your contribution empowers projects in education, environment, community development, and Dhamma service — helping to create a world of mindfulness and compassion.
                </p>

                <a href="#projects" className="hero-btn">
                  Donate Now
                </a>
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
                  <h2>Venerable Samantabhadra Thero</h2>
                  <p>
                    Venerable Samantabhadra Thero is a humble beacon of Dhamma, dedicated to guiding all beings toward peace, wisdom, and compassion. Through his gentle teachings and tireless service, he nourishes the spiritual growth of countless devotees, encouraging mindfulness and loving-kindness in daily life. His vision extends beyond temple walls — awakening hearts to the eternal truth of the Buddha's path.
                  </p>
                  <p>
                    With your generous support, the Thero's mission of compassion and wisdom continues to flourish. Every offering you make becomes a seed of merit, sustaining his efforts to spread the light of Dhamma, uplift communities, and build a foundation of peace for generations to come.
                  </p>
                </div>
              </div>
            </section>

            <div className="projects-section" id="projects">
              {countryCodesLoading && (
                <div className="projects-info">Please wait while country codes are loading…</div>
              )}
              {countryCodesError && <div className="projects-error">{countryCodesError}</div>}
              {projectData.map((project: Project, index: number) => {
                const currentImageIndex = slideIndexes[index] ?? 0;
                const currentImage = project.images[currentImageIndex] || project.images[0];

                return (
                  <div
                    key={project.id}
                    className="project-card h-full flex justify-center items-center"
                  >
                    <div className="project-image h-full">
                      <img src={currentImage} alt={project.title} className="w-full h-full" />
                    </div>
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p className="project-desc">{project.description}</p>
                      <div className="w-full flex gap-5 mb-3">
                        <div className="w-full">
                          <input
                            type="text"
                            id={`firstName-${project.id}`}
                            placeholder="First Name"
                            className="w-full p-2 rounded-md"
                          />
                        </div>
                        <div className="w-full">
                          <input
                            type="text"
                            id={`lastName-${project.id}`}
                            placeholder="Last Name"
                            className="w-full p-2 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-5">
                        <div className="flex w-full gap-3">
                          <select
                            id={`countryCode-${project.id}`}
                            className="w-full p-2 rounded-md"
                            defaultValue=""
                            disabled={
                              countryCodesLoading ||
                              !!countryCodesError ||
                              countryCodes.length === 0
                            }
                          >
                            <option value="" disabled hidden>
                              Country Code
                            </option>
                            {countryCodes.map((option, index) => (
                              <option
                                key={`${project.id}-${option.code}-${index}`}
                                value={option.code}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            id={`mobile-${project.id}`}
                            placeholder="Mobile"
                            className="w-full p-2 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="w-full mt-3">
                        <input
                          type="text"
                          id={`email-${project.id}`}
                          placeholder="Email"
                          className="w-full p-2 rounded-md"
                        />
                      </div>
                      <div className="donation-section">
                        <div className="donation-amount flex items-center gap-2">
                          <span className="text-sm font-semibold">Rs</span>
                          <input
                            type="number"
                            id={`amount-${project.id}`}
                            placeholder={project.defaultAmount.toString()}
                            min={1}
                            defaultValue={project.defaultAmount}
                            className="flex-1"
                          />
                        </div>
                        <button
                          className="donate-btn"
                          onClick={() => donate(project.id)}
                        >
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
                <p>
                  <strong>Contact Information</strong>
                </p>
                <p>☎ +94 775 440 888</p>
                <p>☎ +94 766 730 630</p>
                <p>📧 info@umandawa.com</p>
                <p>🌐 www.umandawa.com</p>
                <p>
                  📍 Umandawa Maha Vihara Ashramya,
                  <br />
                  9th post, Alipallama,
                  <br />
                  Madahapola, Kurunagala,
                  <br />
                  Sri Lanka.
                </p>
                <p>© 2025 Umandawa. Developed By Ceylon Innovation</p>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}

export default App;