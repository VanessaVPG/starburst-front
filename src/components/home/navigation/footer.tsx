import Icons from "@/components/global/icons";
import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative flex flex-col items-center justify-center border-t border-border pt-12 pb-8 px-6 lg:px-8 w-full max-w-7xl mx-auto lg:pt-24">
      <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]" />
      <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]" />

      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        {/* Logo e Descrição curta */}
        <div className="flex flex-col items-start justify-start md:max-w-[200px]">
          <div className="flex items-start">
            <Icons.logo className="w-7 h-7" />
          </div>
          <p className="text-muted-foreground mt-4 text-sm text-start">
            Soluções inteligentes de IA para otimizar a experiência do cliente.
          </p>
          <span className="mt-4 text-neutral-200 text-sm flex items-center">
            Criado com
            <Heart className="w-3.5 h-3.5 ml-1 fill-primary text-primary" />
          </span>
        </div>

        {/* Links úteis e categorias */}
        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            {/* Produto */}
            <div>
              <h3 className="text-base font-medium text-white">Produto</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link href="/features" className="hover:text-foreground transition-all duration-300">
                    Funcionalidades
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/pricing" className="hover:text-foreground transition-all duration-300">
                    Preços
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/testimonials" className="hover:text-foreground transition-all duration-300">
                    Depoimentos
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/integration" className="hover:text-foreground transition-all duration-300">
                    Integrações
                  </Link>
                </li>
              </ul>
            </div>

            {/* Integrações */}
            <div className="mt-10 md:mt-0">
              <h3 className="text-base font-medium text-white">Integrações</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link href="/facebook" className="hover:text-foreground transition-all duration-300">
                    Facebook
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/instagram" className="hover:text-foreground transition-all duration-300">
                    Instagram
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/twitter" className="hover:text-foreground transition-all duration-300">
                    Twitter
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/linkedin" className="hover:text-foreground transition-all duration-300">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-8">
            {/* Recursos */}
            <div>
              <h3 className="text-base font-medium text-white">Recursos</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link href="/blog" className="hover:text-foreground transition-all duration-300">
                    Blog
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/case-studies" className="hover:text-foreground transition-all duration-300">
                    Casos de Sucesso
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/support" className="hover:text-foreground transition-all duration-300">
                    Suporte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div className="mt-10 md:mt-0">
              <h3 className="text-base font-medium text-white">Empresa</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link href="/about" className="hover:text-foreground transition-all duration-300">
                    Sobre Nós
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/privacy" className="hover:text-foreground transition-all duration-300">
                    Política de Privacidade
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="/terms" className="hover:text-foreground transition-all duration-300">
                    Termos e Condições
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Parte inferior do rodapé */}
      <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 w-full flex flex-col md:flex-row items-center justify-between">
       
        <p className="text-sm text-muted-foreground mt-4 md:mt-0">
          Desenvolvido pela equipe Starburst
        </p>
      </div>
    </footer>
  );
};

export default Footer;
