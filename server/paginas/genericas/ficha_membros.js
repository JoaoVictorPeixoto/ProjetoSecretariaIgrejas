class fichaMembro {

    constructor() {
        
    }

    setup(props) {
        this.campos = [
            {
                id: 'meb_rol',
                label: 'Número de Rol',
                value: '',
                size: 3,
                type: 'number',
                size_label: 3
            },
            {
                id: 'meb_nome',
                label: 'Nome do Membro',
                value: '',
                size: 12,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_sexo',
                label: 'Sexo',
                value: '',
                size: 2,
                type: 'select',
                size_label: 3,
                options: [
                    {
                        id: 'M',
                        value: 'Masculino',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'F',
                        value: 'Feminino',
                        selected: false,
                        disabled: false
                    },
                ]
            },
            {
                id: 'meb_est_civil',
                label: 'Estado Civil',
                value: '',
                size: 4,
                type: 'select',
                size_label: 3,
                options: [
                    {
                        id: 'casado',
                        value: 'Casado',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'solteiro',
                        value: 'Solteiro',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'viuvo',
                        value: 'Viuvo',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'divorciado',
                        value: 'Divorciado',
                        selected: false,
                        disabled: false
                    },
                ]
            },
            {
                id: 'meb_data_nasc',
                label: 'Data de Nascimento',
                value: '',
                size: 3,
                type: 'date',
                size_label: 3,
            },
            {
                id: 'meb_data_batismo',
                label: 'Data de Batismo',
                value: '',
                size: 3,
                type: 'date',
                size_label: 3
            },
            {
                id: 'meb_nome_pai',
                label: 'Nome do Pai',
                value: '',
                size: 12,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_nome_mae',
                label: 'Nome da Mãe',
                value: '',
                size: 12,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_escolaridade',
                label: 'Escolaridade',
                value: '',
                size: 6,
                type: 'select',
                size_label: 3,
                options: [
                    {
                        id: 'analfabeto',
                        value: 'Analfabeto',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'le_escrever',
                        value: 'Lê e Escreve',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'fundamental_incompleto',
                        value: 'Ensino Fundamental Incompleto',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'fundamental_completo',
                        value: 'Fundamental Completo',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'medio_incompleto',
                        value: 'Ensino Médio Incompleto',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'medio_completo',
                        value: 'Ensino Médio Completo',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'superio_incompleto',
                        value: 'Superior Incompleto',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 'superio_completo',
                        value: 'Superior Completo',
                        selected: false,
                        disabled: false
                    },
                    
                ]
            },
            {
                id: 'meb_email',
                label: 'Email',
                value: '',
                size: 6,
                type: 'email',
                size_label: 3
            },
            {
                id: 'meb_natural',
                label: 'Natural',
                value: '',
                size: 8,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_uf',
                label: 'UF',
                value: '',
                size: 4,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_end',
                label: 'Endereço',
                value: '',
                size: 6,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_end_num',
                label: 'Número',
                value: '',
                size: 2,
                type: 'number',
                size_label: 3
            },
            {
                id: 'meb_end_cep',
                label: 'Cep',
                value: '',
                size: 4,
                type: 'number',
                size_label: 3
            },
            {
                id: 'meb_bai',
                label: 'Bairro',
                value: '',
                size: 6,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_cid',
                label: 'Cidade',
                value: '',
                size: 6,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_cel',
                label: 'Celular',
                value: '',
                size: 4,
                type: 'number',
                size_label: 3
            },
            {
                id: 'meb_prof',
                label: 'Profissão',
                value: '',
                size: 8,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_cpf',
                label: 'CPF',
                value: '',
                size: 6,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_rg',
                label: 'RG',
                value: '',
                size: 6,
                type: 'text',
                size_label: 3
            },
            {
                id: 'meb_reg_id',
                label: 'Região',
                value: '',
                size: 4,
                type: 'select',
                size_label: 3,
                options: [
                    {
                        id: 1,
                        value: 'Nacional',
                        selected: false,
                        disabled: false
                    },
                ]
            },
            {
                id: 'meb_cong_id',
                label: 'Congregação',
                value: '',
                size: 4,
                type: 'select',
                size_label: 3,
                options: [
                    {
                        id: 1,
                        value: 'Nacional',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 2,
                        value: 'Pedra Azul',
                        selected: false,
                        disabled: false
                    },
                ]
            },
            // {
            //     id: 'meb_data_falecimento',
            //     label: 'Data de falecimento',
            //     value: '',
            //     size: 6,
            //     type: 'text',
            //     size_label: 5
            // },
            {
                id: 'meb_origem',
                label: 'Origem',
                value: '',
                size: 3,
                type: 'select',
                size_label: 3,
                options: [
                    {
                        id: 0,
                        value: 'Lar Cristão',
                        selected: false,
                        disabled: false
                    },
                    {
                        id: 1,
                        value: 'Novo Convertido',
                        selected: false,
                        disabled: false
                    },
                ]
            },
                    ]
        this.buttons = [
            {
                id: 'submit',
                label: 'Enviar',
                value: '',
                size: 1,
                type: 'button',
                size_label: 5,
                submit: true,
                interacao: 'cadastrarMembro'
            }
        ]
    }

}

module.exports = fichaMembro;