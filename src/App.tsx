import React, { useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  const donate = (projectNum: number) => {
    const amountInput = document.getElementById(`amount${projectNum}`) as HTMLInputElement | null;
    const amount = amountInput?.value;

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const projects: Record<number, string> = {
      1: "Temple Renovation",
      2: "Monastic Support",
      3: "Dharma Library",
      4: "Community Outreach",
      5: "Sacred Garden",
    };

    const projectName = projects[projectNum];
    alert(
      `Thank you for your generous dana of $${amount} to ${projectName}!\n\nमे आपको शान्ति मिले\nMay you find peace and enlightenment.\n\nYou will be redirected to the payment page.`
    );

    console.log(`Donation: $${amount} to Project ${projectNum}: ${projectName}`);
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

  return (
    <>
      <div className="decorative-pattern"></div>
      <div className="falling-petals">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="petal" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}>
            🌸
          </div>
        ))}
      </div>

      <div className="container">
        <header>
          <div className="temple-logo"></div>
          <h1>མཐོང་བདེ་ལྡན་</h1>
          <p className="sanskrit-text">Path of Enlightenment Temple</p>
          <p className="intro-text">
            Through your generous dana (donation), you support the preservation of sacred teachings,
            the maintenance of our temple, and the spiritual growth of our community. May your
            giving bring merit and blessings to all sentient beings.
          </p>
        </header>

        <div className="divider">❁ ☸ ❁</div>
        {/* About Section (Image + Description) */}
<section className="about-section">
  <div className="about-content">
    <div className="about-image">
      <img src="/samntha.jpg" alt="Path of Enlightenment Temple" />
    </div>
    <div className="about-text">
      <h2></h2>
      <p>
  Venerable Samantha Badda Thero is a humble beacon of Dhamma, devoted to guiding all beings toward peace, wisdom, and compassion. 
  Through his gentle teachings and tireless service, he continues to nurture the spiritual growth of countless devotees, 
  inspiring mindfulness and loving-kindness in daily life. His vision extends beyond the walls of the temple—awakening 
  hearts to the timeless truth of the Buddha’s path.
</p>
<p>
  With your kind support, the Thero’s mission of compassion and wisdom continues to flourish. 
  Each offering you make becomes a seed of merit, sustaining his efforts to spread the light of Dhamma, 
  uplift communities, and build a foundation of peace for generations to come.
</p>

    </div>
  </div>
</section>


        <div className="projects-section">
          <div className="project-card">
            <div className="project-image">
              <img src="/samntha.jpg" alt="Temple Renovation" />
            </div>
            <div className="project-content">
              <h3>Temple Renovation</h3>
              <p className="project-desc">
                Restore and preserve our sacred meditation hall and prayer rooms. Help maintain this
                sanctuary for future generations.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount1" placeholder="Enter amount ($)" min={1} defaultValue={50} />
                </div>
                <button className="donate-btn" onClick={() => donate(1)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">May your generosity be blessed</p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="/buddha.png" alt="Monastic Support" />
            </div>
            <div className="project-content">
              <h3>Monastic Support</h3>
              <p className="project-desc">
                Provide daily necessities for our resident monks and nuns who dedicate their lives to
                spiritual practice and teaching.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount2" placeholder="Enter amount ($)" min={1} defaultValue={75} />
                </div>
                <button className="donate-btn" onClick={() => donate(2)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">May your kindness multiply</p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="/samntha.jpg" alt="Dharma Library" />
            </div>
            <div className="project-content">
              <h3>Dharma Library</h3>
              <p className="project-desc">
                Build a comprehensive library of Buddhist texts and scriptures. Preserve ancient wisdom
                for scholars and practitioners.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount3" placeholder="Enter amount ($)" min={1} defaultValue={100} />
                </div>
                <button className="donate-btn" onClick={() => donate(3)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">May wisdom illuminate your path</p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="/buddha.png" alt="Community Outreach" />
            </div>
            <div className="project-content">
              <h3>Community Outreach</h3>
              <p className="project-desc">
                Support meditation classes, dharma talks, and retreats. Bring Buddhist teachings to those
                seeking inner peace.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount4" placeholder="Enter amount ($)" min={1} defaultValue={60} />
                </div>
                <button className="donate-btn" onClick={() => donate(4)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">May compassion fill your heart</p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="/samntha.jpg" alt="Sacred Garden" />
            </div>
            <div className="project-content">
              <h3>Sacred Garden</h3>
              <p className="project-desc">
                Create a tranquil meditation garden with traditional Buddhist landscaping. A peaceful
                refuge for contemplation and practice.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount5" placeholder="Enter amount ($)" min={1} defaultValue={85} />
                </div>
                <button className="donate-btn" onClick={() => donate(5)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">May peace blossom within you</p>
            </div>
          </div>
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
            <p>📧 donations@enlightenmenttemple.org</p>
            <p>☎ +1 (555) 123-4567</p>
            <p>📍 123 Dharma Way, Peace Valley</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
