import { FC, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import LanguageUtils from "../utils/language-util";

const messages = LanguageUtils.getFlattenedMessages();

interface Props {
  children: ReactNode;
  language?: string;
}

const IntlProviderWrapper: FC<Props> = ({
  children,
  language,
}): JSX.Element => {
  return (
    <IntlProvider
      locale={language ? language : "vi"}
      messages={messages[language ? language : "vi"]}
      defaultLocale="vi"
    >
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;
