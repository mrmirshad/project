import React, { useEffect, useState } from "react";
import "./App.css";

interface Petal {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

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

  const [petals, setPetals] = useState<Petal[]>([]);

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
            🌸
          </div>
        ))}
      </div>

      <div className="container">
      <header className="hero">
  <div className="hero-overlay"></div>

  <div className="hero-content">
    <img src="/logo.jpg" alt="Umandawa Logo" className="temple-logo" />
    <h1 className="hero-title">Support Umandawa</h1>
    <p className="hero-subtitle">Awaken Humanity • Sustain Compassion • Build a Peaceful Future</p>

    <p className="hero-text">
      The <strong>Umandawa Global Buddhist Village</strong> is a living model of harmony between
      spiritual awakening and sustainable living.  
      Your contribution empowers projects in education, environment, community development, and
      Dhamma service — helping create a mindful and compassionate world.
    </p>

    <a href="#projects" className="hero-btn">Contribute Now</a>
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


        <div className="projects-section" id="projects">
          {/* උමංදාව ශිෂ්‍යත්ව වැඩසටහන */}
          <div className="project-card">
            <div className="project-image">
              <img src="/scholarship.jpg" alt="උමංදාව ශිෂ්‍යත්ව වැඩසටහන" />
            </div>
            <div className="project-content">
              <h3>උමංදාව ශිෂ්‍යත්ව වැඩසටහන</h3>
              <p className="project-desc">
                අධ්‍යාපනය සඳහා දක්ෂතා දක්වන නමුත් ආර්ථික අපහසුතා පවතින සිසු දරුවන් සඳහා 
                උමංදාව මඟින් සෑම මසකම ශිෂ්‍යත්වයක් ලබා දේ. 
                මෙම වැඩසටහනට ඔබටත් සහභාගී විය හැකිය.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount1" placeholder="Enter amount ($)" min={1} defaultValue={40} />
                </div>
                <button className="donate-btn" onClick={() => donate(1)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">සතුට සහ සෞභාග්‍යය ඔබ වෙත ලැබේවා</p>
            </div>
          </div>

          {/* වන අලින් සඳහා ජල ව්‍යාපෘතිය */}
          <div className="project-card">
            <div className="project-image">
              <img src="/elephant-water.jpg" alt="වන අලින් සඳහා ජල ව්‍යාපෘතිය" />
            </div>
            <div className="project-content">
              <h3>වන අලින් සඳහා ජල ව්‍යාපෘතිය</h3>
              <p className="project-desc">
                උමංදාව මඟින් වන අලින්ගේ ජීවිතය සහ පරිසරය ආරක්ෂා කිරීමේ අරමුණින් 
                හබරණ Eco Park හි වැවක් පිළිසකර කරමින් අලින්ගේ පානිය ජල අවශ්‍යතා 
                සපුරාලන ව්‍යාපෘතියක් ක්‍රියාත්මක කර ඇත. 
                ඔබටත් මේ උතුම් වැඩපිළිවෙළට සහයෝගය දැක්විය හැක.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount2" placeholder="Enter amount ($)" min={1} defaultValue={60} />
                </div>
                <button className="donate-btn" onClick={() => donate(2)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">සියලු සත්වයන්ට යහපත් වාසනාව ලැබේවා</p>
            </div>
          </div>

          {/* ව්‍යවසායක ගම්මාන ව්‍යාපෘතිය */}
          <div className="project-card">
            <div className="project-image">
              <img src="/entrepreneur.jpg" alt="උමංදාව ව්‍යවසායක ගම්මාන ව්‍යාපෘතිය" />
            </div>
            <div className="project-content">
              <h3>ව්‍යවසායක ගම්මාන ව්‍යාපෘතිය</h3>
              <p className="project-desc">
                දුෂ්කර ගම්මානවල ජනතාවට ආර්ථික අභියෝග ජය ගැනීම සඳහා උමංදාව 
                නව ව්‍යවසායකයන් සූදානම් කරන වැඩසටහනක් ආරම්භ කර ඇත. 
                වවුනියාවේ ආහාර නිෂ්පාදන සහ පුහුණු වැඩසටහන් මෙහි පළමු අදියරයි.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount3" placeholder="Enter amount ($)" min={1} defaultValue={75} />
                </div>
                <button className="donate-btn" onClick={() => donate(3)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">ඔබේ කරුණා සදාකාලික ආලෝකයක් වේවා</p>
            </div>
          </div>

          {/* පාසල් ක්‍රිකට් සංවර්ධන ව්‍යාපෘතිය */}
          <div className="project-card">
            <div className="project-image">
              <img src="/cricket.jpg" alt="උමංදාව පාසල් ක්‍රිකට් සංවර්ධන ව්‍යාපෘතිය" />
            </div>
            <div className="project-content">
              <h3>පාසල් ක්‍රිකට් සංවර්ධන ව්‍යාපෘතිය</h3>
              <p className="project-desc">
                පහසුකම් අඩු පාසල්වල ක්‍රිකට් ක්‍රීඩාවේ දියුණුව සඳහා 
                උමංදාව මඟින් උපකරණ සහ පුහුණුව ලබා දෙන 
                විශේෂ වැඩසටහනක් ක්‍රියාත්මක වේ. 
                ඔබටත් මේ උතුම් මෙහෙයුමට දායක විය හැක.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount4" placeholder="Enter amount ($)" min={1} defaultValue={50} />
                </div>
                <button className="donate-btn" onClick={() => donate(4)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">ඔබේ පරිත්‍යාගය අලුත් පරපුරක් බබලවයි</p>
            </div>
          </div>

          {/* උභතෝ සංඝයා වෙනුවෙන් දානය */}
          <div className="project-card">
            <div className="project-image">
              <img src="/sangha-dana.jpg" alt="උභතෝ සංඝයා වෙනුවෙන් දානය" />
            </div>
            <div className="project-content">
              <h3>උභතෝ සංඝයා වෙනුවෙන් දානය</h3>
              <p className="project-desc">
                උමංදාව බෞද්ධ විශ්ව ගම්මානයේ භික්ෂු භික්ෂුණී 
                ආර්‍ය මහා සංඝයා සඳහා දානය පූජා කිරීමේ 
                උතුම් අවස්ථාවක් ඔබටද හිමි වේ. 
                පුණ්‍ය පිරිසිදුකම ඔබේ ජීවිතයට රැඳේවා.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount5" placeholder="Enter amount ($)" min={1} defaultValue={100} />
                </div>
                <button className="donate-btn" onClick={() => donate(5)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">සංඝසේවයෙන් පින් පිරි ලෝකයක්</p>
            </div>
          </div>

          {/* පාසල් ආදර්ශ ගෙවතු වගා ව්‍යාපෘතිය */}
          <div className="project-card">
            <div className="project-image">
              <img src="/school-garden.jpg" alt="පාසල් ආදර්ශ ගෙවතු වගා ව්‍යාපෘතිය" />
            </div>
            <div className="project-content">
              <h3>පාසල් ආදර්ශ ගෙවතු වගා ව්‍යාපෘතිය</h3>
              <p className="project-desc">
                උමංදාව මඟින් ක්‍රියාත්මක කරන කෘෂිකර්ම විප්ලවය පාසල්වලටද 
                ව්‍යාප්ත කරමින් සිසු සිසුවියන්ට ගෙවතු වගාව පිළිබඳ දැනුම ලබා 
                දෙන වැඩසටහනකි. පළමු අදියර ගාල්ල රිච්මන්ඩ් විද්‍යාලයෙන් ආරම්භ විය.
              </p>
              <div className="donation-section">
                <div className="donation-amount">
                  <input type="number" id="amount6" placeholder="Enter amount ($)" min={1} defaultValue={55} />
                </div>
                <button className="donate-btn" onClick={() => donate(6)}>
                  Offer Dana
                </button>
              </div>
              <p className="blessing-text">මල පීසෙන ගෙවතු මගින් හදවත පිරිසිදුවේවා</p>
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
