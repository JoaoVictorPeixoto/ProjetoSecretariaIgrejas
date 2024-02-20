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
                size_label: 5
            },
            {
                id: 'meb_nome',
                label: 'Nome do Membro',
                value: '',
                size: 12,
                type: 'text',
                size_label: 5
            },
            {
                id: 'meb_sexo',
                label: 'Sexo',
                value: '',
                size: 2,
                type: 'text',
                size_label: 4
            },
            {
                id: 'meb_est_civil',
                label: 'Estado Civil',
                value: '',
                size: 4,
                type: 'text',
                size_label: 5,
            },
            {
                id: 'meb_data_nasc',
                label: 'Data de Nascimento',
                value: '',
                size: 3,
                type: 'date',
                size_label: 5,
            },
            {
                id: 'meb_data_batismo',
                label: 'Data de Batismo',
                value: '',
                size: 3,
                type: 'date',
                size_label: 5
            },
            // {
            //     id: 'meb_celular',
            //     label: 'Telefone',
            //     value: '',
            //     size: 4,
            //     type: 'number',
            //     size_label: 5
            // },
            {
                id: 'meb_nome_pai',
                label: 'Nome do Pai',
                value: '',
                size: 12,
                type: 'text',
                size_label: 5
            },
            {
                id: 'meb_nome_mae',
                label: 'Nome da Mãe',
                value: '',
                size: 12,
                type: 'text',
                size_label: 5
            },
            {
                id: 'meb_escolaridade',
                label: 'Escolaridade',
                value: '',
                size: 6,
                type: 'text',
                size_label: 5
            },
            {
                id: 'meb_email',
                label: 'Email',
                value: '',
                size: 6,
                type: 'email',
                size_label: 5
            },
            {
                id: 'meb_natural',
                label: 'Natural',
                value: '',
                size: 8,
                type: 'text',
                size_label: 5
            },
            {
                id: 'meb_uf',
                label: 'UF',
                value: '',
                size: 4,
                type: 'text',
                size_label: 5
            },
            {
                id: 'meb_end',
                label: 'Endereço',
                value: '',
                size: 6,
                type: 'text',
                size_label: 5
            },
            {
                id: 'meb_end_num',
                label: 'Número',
                value: '',
                size: 2,
                type: 'number',
                size_label: 5
            },
            {
                id: 'meb_end_cep',
                label: 'Cep',
                value: '',
                size: 4,
                type: 'number',
                size_label: 5
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