import React, { useEffect, useState } from "react";
import "./App.css";

interface Petal {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

const App: React.FC = () => {
  const donate = async (projectNum: number) => {
    const amountInput = document.getElementById(`amount${projectNum}`) as HTMLInputElement | null;
    const amount = amountInput?.value;



    if (!amount || parseFloat(amount) <= 0) {
      alert("කරුණාකර වලංගු දාන මුදලක් ඇතුළත් කරන්න.");
      return;
    }

    const projects: Record<number, string> = {
      1: "උමංදාව ශිෂ්‍යත්ව වැඩසටහන",
      2: "වන අලින් සඳහා ජල ව්‍යාපෘතිය",
      3: "ව්‍යවසායක ගම්මාන ව්‍යාපෘතිය",
      4: "පාසල් ක්‍රිකට් සංවර්ධන ව්‍යාපෘතිය",
      5: "උභතෝ සංඝයා වෙනුවෙන් දානය",
      6: "පාසල් ආදර්ශ ගෙවතු වගා ව්‍යාපෘතිය",
    };

    const res = await fetch('https://umandawa-backend.onrender.com/api/donation/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseFloat(amount).toFixed(2),
        currency: "LKR"

      }),
    });

    const html = await res.text();
    document.open();
    document.write(html);
    document.close();

    // const projectName = projects[projectNum];
    // alert(
    //   `${projectName} සඳහා ඔබගේ $${amount} ඉතා උදාර දානය වෙනුවෙන් ස්තුතියි!\n\nමේ ආපු පින් ඔබට නිවන් සුව දෙත්වා.\n\nඔබව ගෙවීම් පිටුවට යොමු කරනු ලැබේ.`
    // );

    // console.log(`දානය: $${amount} ව්‍යාපෘතිය ${projectNum}: ${projectName}`);
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
            <img src="/logo.jpg" alt="උමංදාව ලාංඡනය" className="temple-logo" />
            <h1 className="hero-title">උමංදාව සහයෝගය</h1>
            <p className="hero-subtitle">මනුෂ්‍යත්වය පිබිදීම • කරුණාව රැකගැනීම • සාමකාමී අනාගතයක් ගොඩනැගීම</p>

            <p className="hero-text">
              <strong>උමංදාව ගෝලීය බෞද්ධ ගම්මානය</strong> යනු අධ්‍යාත්මික පිබිදීම සහ තිරසාර ජීවන රටාව අතර සාමය පෙන්වන ජීවමාන ආදර්ශයකි.
              ඔබේ දායකත්වය අධ්‍යාපනය, පරිසරය, ප්‍රජා සංවර්ධනය සහ ධර්ම සේවාවේ ව්‍යාපෘති බල ගන්වයි — සිහියෙන් හා කරුණාවෙන් යුත් ලෝකයක් නිර්මාණය කිරීමට උපකාරී වේ.
            </p>

            <a href="#projects" className="hero-btn">දැන් දායක වන්න</a>
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
              <h2> ගරු සමන්ත බද්ද ස්වාමීන් වහන්සේ</h2>
              <p>
                ගරු සමන්ත බද්ද ස්වාමීන් වහන්සේ යනු ධර්මයේ නිහතමානී ආලෝක කදම්බයකි, සියලු සත්වයන් සාමය, ප්‍රඥාව සහ කරුණාව කරා මඟ පෙන්වීමට කැපවී සිටී.
                ඔහුගේ මෘදු ඉගැන්වීම් සහ වෙහෙස මහන්සි වී කරන සේවාව තුළින්, ඔහු අසංඛ්‍යාත භක්තිකයන්ගේ අධ්‍යාත්මික වර්ධනය පෝෂණය කරමින් සිටී,
                දෛනික ජීවිතයේ සිහිය සහ මෛත්‍රී බව දිරිමත් කරයි. ඔහුගේ දැක්ම විහාරස්ථාන බිත්ති ඉක්මවා විහිදේ — බුද්ධ මාර්ගයේ නිත්‍ය සත්‍යය වෙත හදවත් පිබිදීම.
              </p>
              <p>
                ඔබේ කාරුණික සහයෝගයෙන්, ස්වාමීන් වහන්සේගේ කරුණාව සහ ප්‍රඥාවේ මෙහෙවර දිගටම වර්ධනය වේ.
                ඔබ කරන සෑම පූජාවක්ම පින් බීජයක් බවට පත්වේ, ධර්මයේ ආලෝකය පැතිරවීමට,
                ප්‍රජාවන් උසස් කිරීමට සහ පරම්පරා ගණනාවකට සාමයේ අඩිතාලමක් ගොඩනැගීමට ඔහුගේ උත්සාහයන් පවත්වාගෙන යනවා.
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
                  දායක වන්න
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
                  දායක වන්න
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
                  දායක වන්න
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
                  දායක වන්න
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
                  දායක වන්න
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
                  දායක වන්න
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
            <p><strong>Contact Information</strong></p>
            <p>☎ +94 775 440 888</p>
            <p>☎ +94 766 730 630</p>
            <p>📧 info@umandawa.com</p>
            <p>🌐 www.umandawa.com</p>
            <p>📍 Umandawa Maha Vihara Ashramya,<br />
               9th post, Alipallama,<br />
               Madahapola, Kurunagala,<br />
               Sri Lanka.</p>
            <p>© 2025 Umandawa. Powered By Ceylon Innovation</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
