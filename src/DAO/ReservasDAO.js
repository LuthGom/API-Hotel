

class ReservasDAO {
    constructor(bd){
        this.bd=bd
    }
   

AllReservas(){
    return new Promisse((resolve,reject)=>{
        this.bd.all('SELECT * FROM RESERVAS',(error,rows)=>{
            if(error){
                reject({
                    'Menssagem':error.message,
                    'erro':true
                })
                
            }else{
                resolve({
                    "reservas":rows,
                    "linhas":rows.length,
                    "erro":false
                    })
                }
            
            })
        
        })


    }

insereReserva(novaReserva){
    return new Promise((resolve,reject)=>{
        this.bd.run(`INSERT INTO RESERVAS (NOME,DATA_DE_ENTRADA,DATA_DE_SAIDA,QUARTO,NUMERO_PESSOAS,STATUS_PAGAMENTO) VALUES(?,?,?,?,?,?,?)`,
        [novaReserva.nome,novaReserva.dia_entrada,novaReserva.dia_saida,novaReserva.num_quarto,novaReserva.num_pessoas,novaReserva.status_pagamento],
        (error)=>{
            if(error){
                reject({
                    "mensagem":error.message,
                    "error":true
                })
            }else{
                resolve({
                    "nova entrada":novaReserva, 
                    "error":false

                })
            }
        })
    })
}

buscaReservaId(id){
    const BUSCA_ID=`SELECT * FROM RESERVAS WHERE ID = ?`
    return new Promise(BUSCA_ID,id,(error,rows)=>{
        if(error){
            reject({
                "mensagem":error.message,
                "erro":true
            })

        } else {
            resolve({
                "busca":rows,
                "erro":false
            })
        }
    })
}


async deletaReserva(id){
    try{
    const reserva = await this.buscaReservaId(id)
    if(reserva.requisicao.length){
        const DELETE = `DELETE FROM RESERVAS WHERE ID = ?`
        return new Promise((resolve,reject)=>{
            this.bd.run(DELETE,id,(error)=>{
                if(error){
                    reject(error.message)
                } else{
                    resolve({
                        "mensagem": `Reserva com id: ${id} foi excluido`,
                        "erro":false
                    })
                }
            })
        })
    } else{
        throw new Error(`O id:${id} da reserva com  não existe`)
    }

} catch (error){
    throw new Error(error.message)
    }

}

async atualizaReserva(id,novaReserva){
    try{
    const UPDATE=`UPDATE RESERVAS SET NOME = ?,DATA_DE_ENTRADA=?,DATA_DE_SAIDA=?,QUARTO=?,NUMERO_PESSOAS=?,STATUS_PAGAMENTO=?
    WHERE ID = ?`
    return new Promise((resolve,reject)=>{
        this.bd.run(UPDATE,[novaReserva.nome,novaReserva.dia_entrada,novaReserva.dia_saida,novaReserva.num_quarto,novaReserva.num_pessoas],
            (error)=>{
                if(error){
                reject(error)
            }else{
                resolve({
                    "mensagem": `Reserva com id ${id} atualizado`,
                    "reserva": novaReserva,
                    "erro":false

                })
            }

        })
    })
} catch (error){
    throw new Error(error.message)
    }
    
}

}


module.exports = ReservasDAO

