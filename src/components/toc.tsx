import { FC, useEffect, useRef, useState } from "react";
import { MdOutlineFormatListNumbered } from "react-icons/md";

interface Props {
  selector: string;
}

const TOC: FC<Props> = ({ selector }): JSX.Element => {
  const [headings, setHeadings] = useState<HTMLHeadElement[]>([]);
  const [currentHeadingID, setCurrentHeadingID] = useState<
    string | undefined
  >();

  const listWrapperRef = useRef<HTMLUListElement>(null);

  const createHeadingArray = () => {
    const headingList = document
      .querySelector(selector)!
      .querySelectorAll("h2,h3,h4") as NodeListOf<HTMLHeadElement>;

    // Gắn data-id vào cho các thẻ heading
    const headingArray = Array.from(headingList);
    headingArray.forEach((heading) => {
      heading.dataset.id = Math.round(Math.random() * 100000).toString();
    });

    setHeadings(headingArray);
  };

  useEffect(() => {
    createHeadingArray();
  }, []);

  // Tìm currentHeading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            setCurrentHeadingID((entry.target as HTMLHeadElement).dataset.id);
          }
        });
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 1 }
    );

    // Chọn phần tử muốn quan sát là các element heading nằm trong state headings
    if (headings.length) {
      headings.forEach((heading) => {
        observer.observe(heading);
      });
    }
  }, [headings.length]);

  // List tự động scroll dựa theo currentHeadingID
  useEffect(() => {
    const currentListItem = listWrapperRef.current?.querySelector(
      `li[data-id='${currentHeadingID}']`
    );

    if (currentListItem && currentHeadingID) {
      listWrapperRef.current?.scrollTo({
        top: (currentListItem as HTMLElement).offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentHeadingID]);

  return (
    <aside>
      <nav className="max-h-[600px] overflow-y-scroll border rounded-md shadow-md pt-6 pb-3 no-scrollbar">
        <ul ref={listWrapperRef}>
          <div className="flex items-center gap-2 tracking-widest pl-5 text-lg text-gray-700 uppercase mb-4 font-extrabold">
            <MdOutlineFormatListNumbered className="w-5 h-w-5" /> Mục Lục
          </div>
          {headings.map((heading) => {
            // Match trả về số đầu tiên nằm trong tagName của các heading
            const tagLevel = heading.tagName.match(/(\d+)/)?.[0] || "1";
            return (
              <li
                key={heading.dataset.id}
                data-id={heading.dataset.id}
                style={{
                  paddingLeft:
                    tagLevel === "4"
                      ? "32px"
                      : tagLevel === "3"
                      ? "42px"
                      : "20px",
                  fontSize:
                    tagLevel === "4"
                      ? "11px"
                      : tagLevel === "3"
                      ? "14px"
                      : "15px",
                }}
                className={`my-6 cursor-pointer pr-4 line-clamp-1 text-sm ${
                  currentHeadingID === heading.dataset.id
                    ? "font-bold text-yellow underline border-l-2 border-yellow"
                    : "text-black_text"
                }`}
                onClick={() => {
                  window.scrollTo({
                    top:
                      heading.getBoundingClientRect().top +
                      window.scrollY -
                      100,
                    behavior: "smooth",
                  });
                }}
              >
                {heading.innerHTML.replace(/<[\s\S]*?>/, "")}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default TOC;
