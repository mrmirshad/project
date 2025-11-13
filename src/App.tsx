import React, { useEffect, useState } from "react";
import "./App.css";
import AppEn from "./App_en";
import DirectPayPage from "./components/DirectPayPage";

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

const projectData: Project[] = [
  {
    id: 1,
    title: "උමංදාව ශිෂ්‍යත්ව වැඩසටහන",
    description:
      "අධ්‍යාපනය සඳහා දක්ෂතා දක්වන නමුත් ආර්ථික අපහසුතා පවතින සිසු දරුවන් සඳහා උමංදාව මඟින් සෑම මසකම ශිෂ්‍යත්වයක් ලබා දේ. මෙම වැඩසටහනට ඔබටත් සහභාගී විය හැකිය.",
    blessing: "සතුට සහ සෞභාග්‍යය ඔබ වෙත ලැබේවා",
    defaultAmount: 5000,
    images: ["/p1_img1.jpg", "/p1_img2.jpg", "/p1_img3.jpg", "/p1_img4.jpg", "/p1_img5.jpg", "/p1_img6.jpg"],
  },
  {
    id: 2,
    title: "වන අලින් සඳහා ජල ව්‍යාපෘතිය",
    description:
      "උමංදාව මඟින් වන අලින්ගේ ජීවිතය සහ පරිසරය ආරක්ෂා කිරීමේ අරමුණින් හබරණ Eco Park හි වැවක් පිළිසකර කරමින් අලින්ගේ පානිය ජල අවශ්‍යතා සපුරාලන ව්‍යාපෘතියක් ක්‍රියාත්මක කර ඇත. ඔබටත් මේ උතුම් වැඩපිළිවෙළට සහයෝගය දැක්විය හැක.",
    blessing: "සියලු සත්වයන්ට යහපත් වාසනාව ලැබේවා",
    defaultAmount: 5000,
    images: ["/p2_img1.jpg", "/p2_img2.jpg", "/p2_img3.jpg", "/p2_img4.jpg", "/p2_img5.jpg"],
  },
  {
    id: 3,
    title: "ව්‍යවසායක ගම්මාන ව්‍යාපෘතිය",
    description:
      "දුෂ්කර ගම්මානවල ජනතාවට ආර්ථික අභියෝග ජය ගැනීම සඳහා උමංදාව නව ව්‍යවසායකයන් සූදානම් කරන වැඩසටහනක් ආරම්භ කර ඇත. වවුනියාවේ ආහාර නිෂ්පාදන සහ පුහුණු වැඩසටහන් මෙහි පළමු අදියරයි.",
    blessing: "ඔබේ කරුණා සදාකාලික ආලෝකයක් වේවා",
    defaultAmount: 5000,
    images: ["/p3_img1.jpg", "/p3_img2.jpg", "/p3_img3.jpg", "/p3_img4.jpg", "/p3_img5.jpg"],
  },
  {
    id: 4,
    title: "පාසල් ක්‍රිකට් සංවර්ධන ව්‍යාපෘතිය",
    description:
      "පහසුකම් අඩු පාසල්වල ක්‍රිකට් ක්‍රීඩාවේ දියුණුව සඳහා උමංදාව මඟින් උපකරණ සහ පුහුණුව ලබා දෙන විශේෂ වැඩසටහනක් ක්‍රියාත්මක වේ. ඔබටත් මේ උතුම් මෙහෙයුමට දායක විය හැක.",
    blessing: "ඔබේ පරිත්‍යාගය අලුත් පරපුරක් බබලවයි",
    defaultAmount: 5000,
    images: ["/p4_img1.jpg", "/p4_img2.jpg", "/p4_img3.jpg", "/p4_img4.jpg", "/p4_img5.jpg", "/p4_img6.jpg"],
  },
  {
    id: 5,
    title: "උභතෝ සංඝයා වෙනුවෙන් දානය",
    description:
      "උමංදාව බෞද්ධ විශ්ව ගම්මානයේ භික්ෂු භික්ෂුණී ආර්‍ය මහා සංඝයා සඳහා දානය පූජා කිරීමේ උතුම් අවස්ථාවක් ඔබටද හිමි වේ. පුණ්‍ය පිරිසිදුකම ඔබේ ජීවිතයට රැඳේවා.",
    blessing: "සංඝසේවයෙන් පින් පිරි ලෝකයක්",
    defaultAmount: 5000,
    images: ["/p5_img1.jpg", "/p5_img2.jpg", "/p5_img3.jpg", "/p5_img4.jpg", "/p5_img5.jpg"],
  },
  {
    id: 6,
    title: "පාසල් ආදර්ශ ගෙවතු වගා ව්‍යාපෘතිය",
    description:
      "උමංදාව මඟින් ක්‍රියාත්මක කරන කෘෂිකර්ම විප්ලවය පාසල්වලටද ව්‍යාප්ත කරමින් සිසු සිසුවියන්ට ගෙවතු වගාව පිළිබඳ දැනුම ලබා දෙන වැඩසටහනකි. පළමු අදියර ගාල්ල රිච්මන්ඩ් විද්‍යාලයෙන් ආරම්භ විය.",
    blessing: "මල පීසෙන ගෙවතු මගින් හදවත පිරිසිදුවේවා",
    defaultAmount: 5000,
    images: ["/p6_img1.jpg", "/p6_img2.jpg", "/p6_img3.jpg", "/p6_img4.jpg"],
  },
];

const App: React.FC = () => {
  const [showEnglish, setShowEnglish] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [slideIndexes, setSlideIndexes] = useState<number[]>(() => projectData.map(() => 0));
  const [showDirectPay, setShowDirectPay] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const startDirectPay = (amount: number, mobile: string, email: string) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      alert("කරුණාකර වලංගු දාන මුදලක් ඇතුළත් කරන්න.");
      return;
    }

    if(!mobile){
      alert("කරුණාකර රට කේතය සමඟ වලංගු ජංගම දුරකථන අංකයක් ඇතුළත් කරන්න.");
      return;
    }

    if (mobile.charAt(0) == '0') {
      alert("කරුණාකර රට කේතය සමඟ වලංගු ජංගම දුරකථන අංකයක් ඇතුළත් කරන්න.");
      return;
    }

    if (!email.includes("@")) {
      alert("කරුණාකර වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න.");
      return;
    }


    setSelectedAmount(amount);
    setShowDirectPay(true);
    setMobile(mobile);
    setEmail(email);
  };

  const donate = async (projectId: number) => {
    const project = projectData.find((item: Project) => item.id === projectId);

    if (!project) {
      console.error(`Project with id ${projectId} not found.`);
      return;
    }

    const amountInput = document.getElementById(`amount-${projectId}`) as HTMLInputElement | null;
    const mobileInput = document.getElementById(`mobile-${projectId}`) as HTMLInputElement | null;
    const emailInput = document.getElementById(`email-${projectId}`) as HTMLInputElement | null;

    const rawAmount = amountInput?.value || project.defaultAmount.toString();
    const parsedAmount = parseFloat(rawAmount);

    startDirectPay(parsedAmount, mobileInput?.value || '', emailInput?.value || '');
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

  if (showDirectPay && selectedAmount !== null) {
    return (
      <DirectPayPage
        amount={selectedAmount}
        mobile={mobile}
        email={email}
        onBack={() => {
          setShowDirectPay(false);
          setSelectedAmount(null);
        }}
      />
    );
  }

  return (
    <>
      {showEnglish ? <AppEn onSwitchToSinhala={() => setShowEnglish(false)} /> : (
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
                <img src="/logo.jpg" alt="උමංදාව ලාංඡනය" className="temple-logo" />
                <button
                  className="language-btn"
                  onClick={() => setShowEnglish(true)}
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
                  English
                </button>
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
                    ඔබේ කාරුණික සහයෝගයෙන්, ස්වාමීන් වහන්සේගේ කරුණා සහ ප්‍රඥාවේ මෙහෙවර දිගටම වර්ධනය වේ.
                    ඔබ කරන සෑම පූජාවක්ම පින් බීජයක් බවට පත්වේ, ධර්මයේ ආලෝකය පැතිරවීමට,
                    ප්‍රජාවන් උසස් කිරීමට සහ පරම්පරා ගණනාවකට සාමයේ අඩිතාලමක් ගොඩනැගීමට ඔහුගේ උත්සාහයන් පවත්වාගෙන යනවා.
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
                      <div className="w-full flex gap-5">
                        <div className="w-full">
                          <input type="text" id={`mobile-${project.id}`} placeholder="Mobile" className="w-full p-2 rounded-md" />
                        </div>
                        <div className="w-full">
                          <input type="text" id={`email-${project.id}`} placeholder="Email" className="w-full p-2 rounded-md" />
                        </div>
                      </div>
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
                          දායක වන්න
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
      )}
    </>
  );
};

export default App;
