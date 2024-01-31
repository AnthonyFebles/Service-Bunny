"""changed langths to make more sense

Revision ID: 44a417f290e0
Revises: bd5ad2781554
Create Date: 2024-01-30 21:38:32.805104

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44a417f290e0'
down_revision = 'bd5ad2781554'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.alter_column('address',
               existing_type=sa.VARCHAR(length=200),
               type_=sa.String(length=50),
               existing_nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('role',
               existing_type=sa.VARCHAR(length=40),
               type_=sa.String(length=10),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('role',
               existing_type=sa.String(length=10),
               type_=sa.VARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.alter_column('address',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=200),
               existing_nullable=False)

    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###