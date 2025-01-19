package repository

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/syrlramadhan/pendaftaran-coc/model"
)

type PendaftarRepositoryImpl struct {
}

func NewPendaftarRepository() PendaftarRepository {
	return &PendaftarRepositoryImpl{}
}

func (p *PendaftarRepositoryImpl) CreatePendaftar(ctx context.Context, tx *sql.Tx, pendaftar model.Pendaftar) (model.Pendaftar, error) {
	query := `INSERT INTO pendaftars (id, nama_lengkap, email, no_telp, bukti_transfer, framework) VALUES(?, ?, ?, ?, ?, ?)`

	_, err := tx.ExecContext(ctx, query, pendaftar.Id, pendaftar.NamaLengkap, pendaftar.Email, pendaftar.NoTelp, pendaftar.BuktiTransfer, pendaftar.Framework)
	if err != nil {
		return pendaftar, fmt.Errorf("failed while entering data: %v", err)
	}

	return pendaftar, nil
}

func (p *PendaftarRepositoryImpl) ReadPendaftar(ctx context.Context, tx *sql.Tx) []model.Pendaftar {
	query := `SELECT id, nama_lengkap, email, no_telp, bukti_transfer, framework FROM pendaftars`

	rows, err := tx.QueryContext(ctx, query)
	if err != nil {
		panic(err)
	}

	var pendaftars []model.Pendaftar
	for rows.Next() {
		pendaftar := model.Pendaftar{}
		err := rows.Scan(&pendaftar.Id, &pendaftar.NamaLengkap, &pendaftar.Email, &pendaftar.NoTelp, &pendaftar.BuktiTransfer, &pendaftar.Framework)
		if err != nil {
			panic(err)
		}
		pendaftars = append(pendaftars, pendaftar)
	}

	return pendaftars
}