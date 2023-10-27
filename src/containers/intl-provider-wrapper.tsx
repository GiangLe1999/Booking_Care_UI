import { FC, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import LanguageUtils from "../utils/language-util";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const messages = LanguageUtils.getFlattenedMessages();

interface Props {
  children: ReactNode;
}

const IntlProviderWrapper: FC<Props> = ({ children }): JSX.Element => {
  const currentLocale = useSelector(
    (state: RootState) => state.language.language
  );

  return (
    <IntlProvider
      locale={currentLocale ? currentLocale : "vi"}
      messages={messages[currentLocale ? currentLocale : "vi"]}
      defaultLocale={currentLocale}
    >
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;
