"""added worker_id field for jobs

Revision ID: bd5ad2781554
Revises: b81a877dd1c0
Create Date: 2024-01-30 15:05:16.716732

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd5ad2781554'
down_revision = 'b81a877dd1c0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('worker_id', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.drop_column('worker_id')

    # ### end Alembic commands ###