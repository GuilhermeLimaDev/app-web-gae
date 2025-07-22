import ReportFilters from "../../components/filters/ReportFilters";
import Header from "../../components/header/Header";
import Problem from "../../components/problems/Problems"
import styles from './Reports.module.css'
const Reports = () => {
    const problemasTeste = [
        {
            id: 1,
            category: "Problema Hidráulico",
            local: "Laboratório 1 andar 4",
            student: "Guilherme Santos",
            status: "EM_ANALISE"
        },
        {
            id: 2,
            category: "Problema Elétrico",
            local: "Sala 203 Bloco B",
            student: "Ana Costa",
            status: "RESOLVIDO"
        },
        {
            id: 3,
            category: "Computador travando",
            local: "Laboratório de Informática",
            student: "Carlos Henrique",
            status: "PENDENTE"
        },
        {
            id: 4,
            category: "Ar-condicionado com defeito",
            local: "Sala 104 Bloco A",
            student: "Juliana Mota",
            status: "EM_ANALISE"
        },
        {
            id: 5,
            category: "Vazamento no teto",
            local: "Corredor principal bloco C",
            student: "Larissa Souza",
            status: "PENDENTE"
        },
        {
            id: 6,
            category: "Porta quebrada",
            local: "Sala 305 Bloco D",
            student: "Matheus Oliveira",
            status: "RESOLVIDO"
        },
        {
            id: 7,
            category: "Lâmpada queimada",
            local: "Banheiro térreo",
            student: "Fernanda Lima",
            status: "EM_ANALISE"
        },
        {
            id: 8,
            category: "Cadeira danificada",
            local: "Auditório",
            student: "Lucas Martins",
            status: "PENDENTE"
        },
        {
            id: 9,
            category: "Problema na rede Wi-Fi",
            local: "Biblioteca",
            student: "Beatriz Ramos",
            status: "RESOLVIDO"
        },
        {
            id: 10,
            category: "Janela emperrada",
            local: "Sala 101 Bloco A",
            student: "João Pedro",
            status: "EM_ANALISE"
        },
        {
            id: 11,
            category: "Tomada com mau contato",
            local: "Sala de professores",
            student: "Mariana Ferreira",
            status: "PENDENTE"
        },
        {
            id: 12,
            category: "Projetor não liga",
            local: "Laboratório multimídia",
            student: "Rodrigo Nascimento",
            status: "EM_ANALISE"
        },
        {
            id: 13,
            category: "Projetor não liga",
            local: "Laboratório multimídia",
            student: "Rodrigo Nascimento",
            status: "EM_ANALISE"
        },
        {
            id: 14,
            category: "Projetor não liga",
            local: "Laboratório multimídia",
            student: "Rodrigo Nascimento",
            status: "EM_ANALISE"
        },
        {
            id: 15,
            category: "Projetor não liga",
            local: "Laboratório multimídia",
            student: "Rodrigo Nascimento",
            status: "EM_ANALISE"
        }
    ];

    const categorias = [
        {
            id: 1,
            name: "Problemas Hidraulicos"
        },
        {
            id: 2,
            name: "Problemas Elétricos"
        },
        {
            id: 3,
            name: "Problemas Estruturais"
        }
    ];

    const locais = [
        {
            id: 1,
            name: "Laboratorio 1 andar 1"
        },
        {
            id: 2,
            name: "Sala 23 corredor 2"
        },
        {
            id: 3,
            name: "Banheiro Térreo Laboratorio"
        }
    ] 

    const handleFiltrar = ()=>{
        alert("clicou e filtrou")
    }


    return (
        <div className={styles.content}>
                <Header title={"PROBLEMAS"}>
                </Header>
                <ReportFilters
                categorias={categorias}
                locais={locais}
                filtrar={handleFiltrar}
                />
            <section className={styles.problem}>
                {problemasTeste.map((p) => (
                    <Problem
                        category={p.category}
                        local={p.local}
                        student={p.student}
                        status={p.status}
                        key={p.id}
                    />
                ))}
            </section>
        </div>
    )
}

export default Reports